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
    const [seacrhText, setsearchText] = useState("");

    return (
        <header className='flex max-w-screen-xl w-full  justify-between gap-x-4 items-center lg:px-10 px-4  py-3'>
            {/* the menu btn for small screen  */}
            <div className='flex gap-2 justify-center items-center'>
                {/* the menu btn for small screen  */}
                <div className='lg:hidden'>
                    <button>
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

            <div className='flex justify-end  w-full items-center gap-x-7'>
                <div className="hidden lg:inline-flex w-full max-w-2xl relative">
                    <input
                        onChange={(e) => setsearchText(e.target.value)}
                        value={seacrhText}
                        className="py-2 px-5 rounded-full text-gray-900 text-lg w-full flex-1 border   placeholder:text-base 
          placeholder:tracking-wide shadow-sm   "
                        placeholder="Search Here" />
                    {seacrhText ? (
                        <IoClose
                            onClick={() => setsearchText("")}
                            className="absolute right-4 top-2.5 text-xl hover:text-red-600 cursor-pointer duration-200" />
                    ) :
                        (<IoSearchOutline className="absolute top-2.5 right-4 text-xl" />)
                    }
                </div>

                <div className='flex gap-4 justify-center items-center'>
                    <FaSearch className='lg:hidden text-2xl' />
                    <FiShoppingCart className='text-2xl' />
                    <MdOutlineAccountCircle className='text-2xl' />

                </div>
            </div>
        </header>
    )
}