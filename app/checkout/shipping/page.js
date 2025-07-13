'use client'
import { useState, useContext, useEffect } from "react";
import { CartContext } from "@/components/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function CheckoutPage() {
    const { cartProducts, hydrated, setCartProducts } = useContext(CartContext);
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { data: session, status } = useSession()

    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
        city: '',
        postalCode: ''
    });

    useEffect(() => {
        if (session && session.user && !shippingInfo.email) {
            setShippingInfo(prev => ({
                ...prev,
                name: session.user.name || '',
                email: session.user.email || '',
            }));
        }
    }, [session]);


    useEffect(() => {
        if (hydrated) {
            if (cartProducts?.length > 0) {
                fetchProducts();
            } else {
                setIsLoading(false);
            }
        }
    }, [cartProducts, hydrated]);


    async function fetchProducts() {
        try {
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ids: cartProducts })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const productsData = await response.json();
            setProducts(productsData);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setIsLoading(false);
        }
    }

    function handleBackToCart() {
        router.push('/cart');
    }

    function handlePrevious() {
        setStep(step - 1);
    }

    // Calculate total price and get unique products with quantities
    const getCartSummary = () => {
        const productCounts = {};
        let totalPrice = 0;

        // Count quantities of each product
        cartProducts.forEach(productId => {
            productCounts[productId] = (productCounts[productId] || 0) + 1;
        });

        // Calculate total and create summary
        const cartSummary = Object.entries(productCounts).map(([productId, quantity]) => {
            const product = products.find(p => p._id === productId);
            if (product) {
                const subtotal = product.price * quantity;
                totalPrice += subtotal;
                return {
                    ...product,
                    quantity,
                    subtotal
                };
            }
            return null;
        }).filter(Boolean);

        return { cartSummary, totalPrice };
    };

    const { cartSummary, totalPrice } = getCartSummary();


    const handlePaystackPayment = () => {
        if (!window.PaystackPop) {
            console.error('Paystack script not loaded');
            return;
        }
        try {
            const handler = window.PaystackPop.setup({
                key: process.env.NEXT_PUBLIC_PAYSTACK_PK,
                email: shippingInfo.email,
                amount: totalPrice * 100, // in kobo
                currency: 'NGN',
                ref: `ref-${Date.now()}`,
                firstname: shippingInfo.name.split(' ')[0],
                lastname: shippingInfo.name.split(' ')[1] || '',
                phone: shippingInfo.phone,
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Mobile Number",
                            variable_name: "mobile_number",
                            value: shippingInfo.phone,
                        }
                    ]
                },
                callback: function (response) {
                    verifyPayment(response.reference);
                    console.log('Payment successful!', response);
                },
                onClose: function () {
                    console.log('Payment closed');
                },
            });

            handler.openIframe();
        } catch (error) {
            console.error('Paystack initialization error:', error);

        }
    };

    async function verifyPayment(reference) {
        try {
            const res = await fetch('/api/verify-payment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reference }),
            });

            const data = await res.json();



            if (data.status === 'success') {
                const saveRes = await fetch('/api/order', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        ...shippingInfo,
                        cartProducts,
                        paid: true,
                    }),
                });

                console.log("Sending order:", {
                    ...shippingInfo,
                    cartProducts,
                    paid: true,
                });

                const saveData = await saveRes.json();
                if (saveData.status === 'success') {
                    setCartProducts([]);
                    setStep(4);
                } else {
                    alert('Failed to save order');

                }
            } else {
                alert('Payment verification failed');
            }

        } catch (error) {
            console.error('Error verifying payment:', error);
            alert('Something went wrong');
        }
    }





    const steps = [
        { number: 1, title: "Delivery Info" },
        { number: 2, title: "Review Order" },
        { number: 3, title: "Payment" },
        { number: 4, title: "Complete" }
    ];

    return (
        <>
            <Header />
            <div className="max-w-2xl mx-auto p-6 min-h-screen flex flex-col justify-center items-center">
                {/* Progress Bar */}
                <div className="w-full mb-8">
                    <div className="flex items-center justify-between mb-4">
                        {steps.map((stepItem, index) => (
                            <div key={stepItem.number} className="flex flex-col items-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${step >= stepItem.number
                                    ? 'bg-black text-white'
                                    : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {step > stepItem.number ? (
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    ) : (
                                        stepItem.number
                                    )}
                                </div>
                                <span className={`text-xs mt-2 ${step >= stepItem.number ? 'text-black' : 'text-gray-500'
                                    }`}>
                                    {stepItem.title}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Progress Line */}
                    <div className="relative">
                        <div className="absolute top-0 left-0 h-1 bg-gray-200 rounded-full" style={{ width: '100%' }}></div>
                        <div
                            className="absolute top-0 left-0 h-1 bg-black rounded-full transition-all duration-300 ease-in-out"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>
                    </div>
                </div>

                {step === 1 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Delivery Information</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                setStep(2);
                            }}
                            className="space-y-4 w-full"
                        >
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={shippingInfo.name}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                                className="w-full py-2 px-5 border rounded-full"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={shippingInfo.email}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                className="w-full py-2 px-5 border rounded-full"
                                required
                            />

                            <div className="flex flex-col md:flex-row gap-4">
                                <input
                                    type="text"
                                    placeholder="City"
                                    value={shippingInfo.city}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                                    className="w-full py-2 px-5 border rounded-full"
                                    required
                                /><input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={shippingInfo.postalCode}
                                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                                    className="w-full py-2 px-5 border rounded-full"
                                    required
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Address"
                                value={shippingInfo.address}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                                className="w-full py-2 px-5 border rounded-full"
                                required
                            />
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={shippingInfo.phone}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                                className="w-full py-2 px-5 border rounded-full"
                                required
                            />

                            <div className="flex w-full justify-between items-center mt-4">
                                <button onClick={handleBackToCart} type="button" className="flex justify-center gap-2 items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>

                                    Back to cart
                                </button>
                                <button type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-full flex justify-center items-center gap-3"
                                >
                                    Next
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                        <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Review Order</h2>

                        {isLoading ? (
                            <div className="flex justify-center items-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black"></div>
                            </div>
                        ) : (
                            <>
                                {cartSummary.length > 0 ? (
                                    <div className="w-full mb-6">
                                        <div className="rounded-4xl border-2 border-[#d6d5d5] p-4 mb-4">
                                            {cartSummary.map((item, index) => (
                                                <div key={index} className="flex justify-between items-center py-3 border-[#d6d5d5] border-b last:border-b-0">
                                                    <div className="flex-1">
                                                        <h3 className="font-medium">{item.title}</h3>
                                                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium">₦{item.subtotal.toLocaleString()}</p>
                                                        <p className="text-sm text-gray-600">₦{item.price.toLocaleString()} each</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center font-bold text-lg border-[#d6d5d5] border-t pt-4">
                                            <span>Total:</span>
                                            <span>₦{totalPrice.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <p className="text-gray-600">Your cart is empty</p>
                                    </div>
                                )}
                            </>
                        )}

                        <div className="flex w-full justify-between items-center mt-4">
                            <button
                                onClick={handlePrevious}
                                type="button"
                                className="flex justify-center gap-2 items-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>

                                Back
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="bg-black text-white px-4 py-2 rounded-full flex justify-center items-center gap-3"
                                disabled={cartSummary.length === 0}
                            >
                                Next
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Payment</h2>

                        {/* Order Summary */}
                        <div className="w-full mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="font-semibold mb-2">Order Summary</h3>
                            <div className="space-y-1 text-sm">
                                {cartSummary.map((item, index) => (
                                    <div key={index} className="flex justify-between">
                                        <span>{item.title} x{item.quantity}</span>
                                        <span>₦{item.subtotal.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                                <span>Total:</span>
                                <span>₦{totalPrice.toLocaleString()}</span>
                            </div>
                        </div>

                        <button onClick={handlePaystackPayment} className="bg-black text-white px-6 py-3 rounded-full">
                            Proceed to Paystack Payment
                        </button>


                        <div className="flex w-full justify-between items-center mt-4">
                            <button
                                onClick={handlePrevious}
                                type="button"
                                className="flex justify-center gap-2 items-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                Back
                            </button>
                            <button onClick={handleBackToCart} type="button" className="flex justify-center gap-2 items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                Back to cart
                            </button>
                        </div>
                    </>
                )}

                {step === 4 && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-green-600">Payment Successful!</h2>
                        <p>Thank you for your purchase 🎉</p>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
}