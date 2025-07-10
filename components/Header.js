"use client";
import Link from "next/link";
import { useState } from 'react'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi';
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { MdOutlineAccountCircle } from "react-icons/md";
import { IoClose, IoSearchOutline } from "react-icons/io5"


export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState("");
    const [showMobileSearch, setShowMobileSearch] = useState(false);

    return (
        <header className='max-w-screen-xl w-full lg:px-10 px-4 py-3'>
            <div className="flex justify-between gap-x-4 items-center w-full">
                {/* the menu btn for small screen  */}
                <div className='flex gap-2 justify-center items-center'>
                    {/* the menu btn for small screen  */}
                    <div className='lg:hidden'>
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? (
                                <HiX className='text-3xl' />
                            ) : (
                                <HiMenu className='text-3xl' />
                            )
                            }
                        </button>
                    </div>

                    <Link href={'/'} className='font-extrabold text-2xl lg:text-4xl'> Mish.CO</Link>
                </div>

                <nav className='hidden w-full lg:block'>
                    <div className='flex justify-center items-center gap-x-10'>
                        <Link href={'/'}>Shop</Link>
                        <Link href={'/product'}>Products</Link>
                        <Link href={'/sale'}>On Sales</Link>
                        <Link href={'arrival'}>New Arrivals</Link>
                        <Link href={'brand'}>Brands</Link>
                    </div>
                </nav>

                <div className='flex justify-end w-full items-center gap-x-7'>
                    <div className="hidden lg:inline-flex w-full max-w-2xl relative">
                        <input
                            onChange={(e) => setSearchText(e.target.value)}
                            value={searchText}
                            className="py-2 px-5 rounded-full text-gray-900 text-lg w-full flex-1 border   placeholder:text-base 
                                        placeholder:tracking-wide shadow-sm   "
                            placeholder="Search Here" />
                        {searchText ? (
                            <IoClose
                                onClick={() => setSearchText("")}
                                className="absolute right-4 top-2.5 text-xl hover:text-red-600 cursor-pointer duration-200" />
                        ) :
                            (<IoSearchOutline className="absolute top-2.5 right-4 text-xl" />)
                        }
                    </div>

                    <div className='flex gap-4 justify-center items-center'>
                        <IoSearchOutline
                            className="text-2xl lg:hidden"
                            onClick={() => setShowMobileSearch(!showMobileSearch)}
                        />
                        <FiShoppingCart className='text-2xl' />
                        <MdOutlineAccountCircle className='text-2xl' />
                    </div>
                </div>
            </div>

            {/* Mobile Search Input - Now positioned outside the main flex container */}
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
    )
}