"use client";
import Link from "next/link";
import { useContext, useEffect, useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { CartContext } from "./CartContext";
import { useSession, signIn, signOut } from "next-auth/react";
import PrimaryBtn from "./PrimaryBtn";


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);
    const [scrolled, setScrolled] = useState(false);


    const { cartProducts } = useContext(CartContext);
    const { data: session } = useSession();



    return (
        <header
            className='fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-none'>
            <div className="flex justify-between items-center max-w-screen-xl w-full mx-auto lg:px-10 px-4 py-3">
                {/* Left: Logo + Menu button */}
                <div className='flex gap-2 items-center'>
                    <div className='lg:hidden'>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <HiX className='text-3xl' /> : <HiMenu className='text-3xl' />}
                        </button>
                    </div>
                    <Link href={'/'} className='font-extrabold text-2xl lg:text-4xl'>
                        Mish.CO
                    </Link>
                </div>

                {/* Center: Desktop nav */}
                <nav className='hidden lg:block w-full'>
                    <div className='flex justify-center items-center gap-x-10'>
                        <Link href={'/'}>Shop</Link>
                        <Link href={'/product'}>Products</Link>
                        <Link href={'/sale'}>On Sales</Link>
                        <Link href={'/arrival'}>New Arrivals</Link>
                        <Link href={'/brand'}>Brands</Link>
                    </div>
                </nav>

                {/* Right: Search & Icons */}
                <div className='flex justify-end items-center gap-x-5 w-full'>
                    <div className="hidden lg:inline-flex w-full max-w-2xl relative">
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            className="py-2 px-5 rounded-full text-gray-900 text-lg w-full border placeholder:text-base shadow-sm"
                            placeholder="Search Here"
                        />
                        {searchText ? (
                            <IoClose
                                onClick={() => setSearchText("")}
                                className="absolute right-4 top-2.5 text-xl hover:text-red-600 cursor-pointer"
                            />
                        ) : (
                            <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
                        )}
                    </div>

                    <div className='flex gap-4 items-center justify-between'>



                        {session ? (
                            <>
                                <IoSearchOutline
                                    className="text-2xl lg:hidden"
                                    onClick={() => setShowMobileSearch(!showMobileSearch)}
                                />
                                <Link href={'/cart'}>
                                    <div className="relative">
                                        <FiShoppingCart className='text-xl relative' />
                                        <div className="px-[5px] bg-black rounded-full text-white absolute text-sm right-[-10px] top-[-8px]">{cartProducts.length}</div>
                                    </div>
                                </Link>
                                <Link href="/profile" className="hidden lg:block">
                                    <MdOutlineAccountCircle className="text-2xl" />
                                </Link>
                            </>
                        ) : (
                            <PrimaryBtn onClick={() => signIn()} className="text-xs">Login</PrimaryBtn>
                        )}
                    </div>

                </div>
            </div>

            {/* Mobile Search Input */}
            {showMobileSearch && (
                <div className="w-full mt-4 px-4 lg:hidden relative">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="py-2 px-5 w-full rounded-full text-gray-900 text-base border shadow-sm"
                        placeholder="Search Here"
                    />
                    {searchText ? (
                        <IoClose
                            onClick={() => setSearchText("")}
                            className="absolute right-6 top-2.5 text-xl hover:text-red-600 cursor-pointer"
                        />
                    ) : (
                        <IoSearchOutline className="absolute right-6 top-2.5 text-xl" />
                    )}
                </div>
            )}

            {/* Mobile Nav Links */}
            {isOpen && (
                session ? (
                    <nav className="w-full mt-4 px-4 lg:hidden border-[#d6d5d5] shadow-sm pb-4 border-b" >
                        <div className='flex flex-col gap-3'>
                            <Link href={'/'}>Shop</Link>
                            <Link href={'/product'}>Products</Link>
                            <Link href={'/sale'}>On Sales</Link>
                            <Link href={'/arrival'}>New Arrivals</Link>
                            <Link href={'/brand'}>Brands</Link>
                            <Link href={'/profile'}>Profile</Link>
                            <PrimaryBtn onClick={() => signOut({ callbackUrl: 'http://localhost:3001/' })} className="text-sm ml-2">Logout</PrimaryBtn>

                        </div>
                    </nav>
                ) : (
                    <nav className="w-full mt-4 px-4 lg:hidden">
                        <div className='flex flex-col gap-3'>
                            <Link href={'/'}>Shop</Link>
                            <Link href={'/product'}>Products</Link>
                            <Link href={'/sale'}>On Sales</Link>
                            <Link href={'/arrival'}>New Arrivals</Link>
                            <Link href={'/brand'}>Brands</Link>
                        </div>
                    </nav>
                )
            )}
        </header >
    );
}
