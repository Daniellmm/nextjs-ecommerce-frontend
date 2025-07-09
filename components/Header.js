"use client";
import Link from "next/link";
import { useState } from 'react'
import { HiMenu, HiX } from 'react-icons/hi';
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoClose, IoSearchOutline } from "react-icons/io5";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    return (
        <header className='relative flex flex-wrap max-w-screen-xl w-full justify-between items-center lg:px-10 px-4 py-3 mx-auto'>
            {/* Left Section: Logo and Menu */}
            <div className='flex gap-3 items-center'>
                <div className='lg:hidden'>
                    <button onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <HiX className='text-3xl' /> : <HiMenu className='text-3xl' />}
                    </button>
                </div>
                <Link href={'/'} className='font-extrabold text-2xl lg:text-4xl'>Mish.CO</Link>
            </div>

            {/* Center Nav Links - Desktop */}
            <nav className='hidden lg:block w-full'>
                <div className='flex justify-center gap-x-10'>
                    <Link href={'/'}>Shop</Link>
                    <Link href={'/product'}>Products</Link>
                    <Link href={'/sale'}>On Sales</Link>
                    <Link href={'/arrival'}>New Arrivals</Link>
                    <Link href={'/brand'}>Brands</Link>
                </div>
            </nav>

            {/* Right Icons */}
            <div className='flex items-center gap-5'>
                {/* Desktop Search */}
                <div className="hidden lg:flex w-full max-w-md relative">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="py-2 px-5 rounded-full text-gray-900 text-lg w-full border shadow-sm placeholder:text-base"
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

                {/* Mobile Icons */}
                <div className="flex gap-4 lg:hidden">
                    <FaSearch
                        className="text-2xl"
                        onClick={() => setShowMobileSearch(!showMobileSearch)}
                    />
                    <FiShoppingCart className='text-2xl' />
                    <MdOutlineAccountCircle className='text-2xl' />
                </div>
            </div>

            {/* Mobile Search Input */}
            {showMobileSearch && (
                <div className="w-full mt-4 lg:hidden relative">
                    <input
                        onChange={(e) => setSearchText(e.target.value)}
                        value={searchText}
                        className="py-2 px-5 w-full rounded-full text-gray-900 text-base border shadow-sm"
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
            )}

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <nav className="w-full mt-4 lg:hidden">
                    <div className='flex flex-col gap-3'>
                        <Link href={'/'}>Shop</Link>
                        <Link href={'/product'}>Products</Link>
                        <Link href={'/sale'}>On Sales</Link>
                        <Link href={'/arrival'}>New Arrivals</Link>
                        <Link href={'/brand'}>Brands</Link>
                    </div>
                </nav>
            )}
        </header>
    );
}
