'use client'
import { useState, useContext } from "react";
import { CartContext } from "@/components/CartContext";
import { PaystackButton } from "react-paystack";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cartProducts } = useContext(CartContext);
    const router = useRouter();
    const [products, setProducts] = useState([]);

    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: '',
        address: '',
        phone: '',
        email: '',
    });

    function handleBackToCart() {
        router.push('/cart');
    }

    function handlePrevious() {
        setStep(step - 1);
    }

    let totalPrice = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        totalPrice += price;
    }

    const publicKey = "your-paystack-public-key";
    const totalAmount = 5000 * 100; // amount in kobo

    const componentProps = {
        email: shippingInfo.email,
        amount: totalAmount,
        metadata: {
            name: shippingInfo.name,
            phone: shippingInfo.phone,
        },
        publicKey,
        text: "Pay Now",
        onSuccess: () => {
            setStep(4);
        },
        onClose: () => alert("Payment closed"),
    };

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
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                                    step >= stepItem.number 
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
                                <span className={`text-xs mt-2 ${
                                    step >= stepItem.number ? 'text-black' : 'text-gray-500'
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
                            <input
                                type="email"
                                placeholder="Email Address"
                                value={shippingInfo.email}
                                onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                                className="w-full py-2 px-5 border rounded-full"
                                required
                            />
                            <div className="flex w-full justify-between items-center mt-4">
                                <button onClick={handleBackToCart} type="button" className="flex justify-center gap-2 items-center cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                    Back to cart
                                </button>
                                <button type="submit" className="bg-black text-white px-4 py-2 rounded-full">
                                    Next
                                </button>
                            </div>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Review Order</h2>
                        {/* List Cart Items Here */}
                        <ul className="mb-4">
                            {cartProducts.map((id, index) => (
                                <li key={index}>Product: {id}</li>
                                // Replace with actual product data if available
                            ))}
                        </ul>
                        <div className="flex w-full justify-between items-center mt-4">
                            <button 
                                onClick={handlePrevious} 
                                type="button" 
                                className="flex justify-center gap-2 items-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                Previous
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                className="bg-black text-white px-4 py-2 rounded-full flex justify-center items-center gap-3"
                            >
                                Proceed to Payment
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
                        <PaystackButton {...componentProps} className="bg-green-600 text-white px-6 py-3 rounded mb-4" />
                        <div className="flex w-full justify-between items-center mt-4">
                            <button 
                                onClick={handlePrevious} 
                                type="button" 
                                className="flex justify-center gap-2 items-center cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                </svg>
                                Previous
                            </button>
                            <button onClick={handleBackToCart} type="button" className="flex justify-center gap-2 items-center cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                    <path fillRule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
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