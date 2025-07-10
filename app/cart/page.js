'use client'
import { CartContext } from "@/components/CartContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {

    const { cartProducts } = useContext(CartContext);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        if (cartProducts?.length > 0) {
            axios.post('/api/cart', { ids:cartProducts })
                .then(response => {
                    setProducts(response.data);
                })
        }
    }, [cartProducts]);

    return (
        <>
            <Header />

            <div className="flex flex-col items-center justify-start min-h-[60vh] lg:px-20 px-5 gap-y-4 pt-24">
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

                    {products?.length > 0 && (
                        <>
                            <div className="flex flex-col justify-center items-start w-full lg:w-[60%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3 p-5">
                                {products.map(product => (
                                    <div key={product._id}>
                                        {product.title}
                                    </div>
                                ))}
                            </div>
                        </>
                    )}


                    {/* Checkout Details section */}
                    {!!cartProducts?.length && (
                        <div className="flex flex-col justify-center items-center w-full lg:w-[40%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3 p-5">
                            <h1 className="text-2xl font-semibold  text-start w-full">Order Summary</h1>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Subtotal</p>
                                <p className="text-lg font-semibold">$0.00</p>
                            </div>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Discount</p>
                                <p className="text-lg font-semibold text-red-600">$0.00</p>
                            </div>
                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/60">Delivery Fee</p>
                                <p className="text-lg font-semibold">$0.00</p>
                            </div>

                            <div className="w-full border border-[#F0F0F0]"></div>

                            <div className="flex justify-between items-center w-full ">
                                <p className="text-[#00000099]/80 text-lg">Total</p>
                                <p className="text-2xl font-semibold">$0.00</p>
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