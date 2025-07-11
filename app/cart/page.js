'use client'
import { CartContext } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {

    const { cartProducts, addProduct, removeProduct, removeAllProduct } = useContext(CartContext);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', { ids: cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        } else {
            // Clear products when cart is empty
            setProducts([]);
        }
    }, [cartProducts]);


    function increaseProduct(id) {
        addProduct(id);
    }

    function decreaseProduct(id) {
        // Only decrease if there's more than 1 item
        const productCount = cartProducts.filter(productId => productId === id).length;
        if (productCount > 1) {
            removeProduct(id);
        }
    }

    function deleteProduct(id) {
        // Remove all instances of this product
        removeAllProduct(id);
    }

    let totalPrice = 0;

    for (const productId of cartProducts) {
        const price = products.find(p => p._id === productId)?.price || 0;
        totalPrice += price;
    }

    let totaldiscount = 0

    for (const productId of cartProducts) {
        const discount = products.find(p => p._id === productId)?.discount || 0;
        totaldiscount += discount;
    }

    let totalpercentage = 0

    for (const productId of cartProducts) {
        const percentage = products.find(p => p._id === productId)?.percentage || 0;
        totalpercentage += percentage;
    }



    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-start w-full min-h-[60vh] lg:px-20 px-5 gap-y-4 pt-24">
                <div className=" flex justify-start items-center gap-x-1 w-full">
                    <Link href={'/'}>Home</Link>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                    </svg>
                    <Link href={'/cart'}>Cart</Link>
                </div>

                {!cartProducts?.length && (
                    <div className="flex w-full justify-start">
                        <h1 className="text-2xl font-semibold lg:text-4xl lg:font-bold "></h1>
                    </div>
                )}
                {cartProducts?.length > 0 && (
                    <div className="flex w-full justify-start">
                        <h1 className="text-2xl font-semibold lg:text-4xl lg:font-bold ">Your cart</h1>
                    </div>
                )}
                <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-5">
                    {/* product Details section */}

                    {!cartProducts?.length && (
                        <div className="font-semibold text-2xl">
                            Your cart is empty
                        </div>
                    )}

                    {products?.length > 0 && cartProducts?.length > 0 && (
                        <>
                            <div className="flex flex-col justify-center items-start w-full lg:w-[60%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3">
                                {products.map(product => {
                                    const productCount = cartProducts.filter(id => id === product._id).length;
                                    const isMinimum = productCount === 1;

                                    return (
                                        <div key={product._id} className="w-full flex rounded-lg p-4 gap-4">
                                            {/* LEFT SIDE */}
                                            <div className="flex gap-4 w-2/3 items-center">
                                                {product.images?.[0] && (
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.title}
                                                        width={80}
                                                        height={80}
                                                        className="rounded-lg object-cover bg-[#F0EEED] shadow-md p-1"
                                                    />
                                                )}
                                                <div className="flex flex-col justify-between">
                                                    <h2 className="text-sm font-semibold">{product.title}</h2>
                                                    {product.properties?.[0] && (
                                                        <p>{product.properties[0]}</p>
                                                    )}
                                                    <h2 className="text-md font-semibold">${product.price}</h2>
                                                </div>
                                            </div>

                                            {/* RIGHT SIDE */}
                                            <div className="flex flex-col justify-between items-end w-1/3 gap-3">
                                                {/* Delete Icon */}
                                                <button
                                                    onClick={() => deleteProduct(product._id)}
                                                    className="self-end text-red-500 hover:text-red-700 cursor-pointer delete-button transition-colors"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                        <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>

                                                {/* Quantity Controls */}
                                                <div className="flex justify-center items-center gap-x-2 py-1 px-4 bg-[#F0F0F0] rounded-full">
                                                    <button
                                                        onClick={() => decreaseProduct(product._id)}
                                                        disabled={isMinimum}
                                                        className={`rounded-full cursor-pointer transition-colors ${isMinimum
                                                                ? 'text-gray-400 cursor-not-allowed'
                                                                : 'text-black hover:text-gray-600'
                                                            }`}
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                                            <path d="M3.75 7.25a.75.75 0 0 0 0 1.5h8.5a.75.75 0 0 0 0-1.5h-8.5Z" />
                                                        </svg>
                                                    </button>
                                                    <div>{productCount}</div>
                                                    <button onClick={() => increaseProduct(product._id)} className="rounded-full cursor-pointer hover:text-gray-600 transition-colors">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                                            <path d="M8.75 3.75a.75.75 0 0 0-1.5 0v3.5h-3.5a.75.75 0 0 0 0 1.5h3.5v3.5a.75.75 0 0 0 1.5 0v-3.5h3.5a.75.75 0 0 0 0-1.5h-3.5v-3.5Z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}


                    {/* Checkout Details section */}
                    {!!cartProducts?.length && (
                        <div className="flex flex-col justify-center items-center w-full lg:w-[40%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3 p-5">
                            <h1 className="text-2xl font-semibold  text-start w-full">Order Summary</h1>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Subtotal</p>
                                <p className="text-lg font-semibold">${totalPrice}</p>
                            </div>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Discount ({totalpercentage})</p>
                                <p className="text-lg font-semibold text-red-600">-${totaldiscount}</p>
                            </div>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Delivery Fee</p>
                                <p className="text-lg font-semibold">$0.00</p>
                            </div>

                            <div className="w-full border border-[#F0F0F0]"></div>

                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/80 text-lg">Total</p>
                                <p className="text-2xl font-semibold">${totalPrice}</p>
                            </div>

                            <div className="flex gap-x-3 w-full items-center justify-between">
                                <div className="relative w-full">
                                    <input
                                        type="text"
                                        placeholder="Add promo code"
                                        className="relative w-full px-9 py-3 placeholder:text-[#00000099]/60 rounded-full bg-[#F0F0F0] text-black border-0 focus:border-0"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 text-[#00000099]/60 absolute top-[12px] left-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                                    </svg>

                                </div>

                                <button className="bg-black text-white rounded-full px-8 py-3 text-sm ">Apply</button>
                            </div>

                            <div className="w-full">
                                <button className="bg-black flex justify-center items-center gap-3 text-white rounded-full w-full px-8 py-3 text-sm  mt-3">Go to Checkout  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                </svg>
                                </button>
                            </div>

                        </div>
                    )}



                </div>

            </div >
            <Footer />
        </>
    );
}