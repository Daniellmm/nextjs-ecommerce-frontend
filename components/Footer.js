import Image from "next/image";
import CARD from '../public/card.png'
import { FaTwitter, FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";


export default function Footer() {
    return (
        <div className="relative flex flex-col justify-center items-center  py-10">
            <div className="p-10 w-full bg-white relative"></div>


            <div className="relative w-full">
                <div className="bg-black absolute z-10 top-[-70px] left-4 right-4 lg:left-20 lg:right-20 rounded-2xl p-6 flex flex-col lg:flex-row justify-between items-center gap-5">
                    <h1 className="font-bold text-white lg:text-3xl text-xl">
                        STAY UPTO DATE ABOUT <br className="hidden lg:block" /> OUR LATEST OFFERS
                    </h1>
                    <div className="flex flex-col gap-y-3 w-full lg:w-auto">
                        <input
                            type="text"
                            placeholder="Enter your email address"
                            className="w-full px-7 py-3 placeholder:text-gray-300 rounded-full bg-white text-black border-0 focus:border-0"
                        />

                        <button className="bg-white rounded-full px-8 py-2 ">
                            Subscribe to Newsletter
                        </button>
                    </div>
                </div>
            </div>

            <div className="bg-[#F0F0F0] relative w-full flex flex-col justify-center items-center px-10">
                <div className="flex flex-col lg:flex-row justify-start items-start w-full gap-5 pt-44 lg:px-10 lg:pt-32 pb-10">
                    <div className="flex flex-col justify-center items-start lg:w-[50%] w-full gap-y-3">
                        <h1 className="font-bold text-4xl">Mish.CO</h1>
                        <p>
                            We have clothes that suits your style and which you’re proud to wear. From women to men.
                        </p>

                        <div className="flex gap-x-4 mt-4">
                            <div className="bg-white p-2 rounded-full border border-gray-300">
                                <FaTwitter />
                            </div>
                            <div className="bg-white p-2 rounded-full border border-gray-300">
                                <FaFacebook />
                            </div>
                            <div className="bg-white p-2 rounded-full border border-gray-300">
                                <FaInstagram />
                            </div>
                            <div className="bg-white p-2 rounded-full border border-gray-300">
                                <FaTiktok />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-semibold uppercase">Company</h1>
                            <a href="#" className="text-gray-600 hover:text-black">About</a>
                            <a href="#" className="text-gray-600 hover:text-black">Features </a>
                            <a href="#" className="text-gray-600 hover:text-black">Works</a>
                            <a href="#" className="text-gray-600 hover:text-black">Career</a>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-semibold uppercase">Help</h1>
                            <a href="#" className="text-gray-600 hover:text-black">Customer Support</a>
                            <a href="#" className="text-gray-600 hover:text-black">Delivery Details</a>
                            <a href="#" className="text-gray-600 hover:text-black">Terms & Conditions</a>
                            <a href="#" className="text-gray-600 hover:text-black">Privacy Policy</a>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-semibold uppercase">FAQ</h1>
                            <a href="#" className="text-gray-600 hover:text-black">Account</a>
                            <a href="#" className="text-gray-600 hover:text-black">Manage Deliveries</a>
                            <a href="#" className="text-gray-600 hover:text-black">Orders</a>
                            <a href="#" className="text-gray-600 hover:text-black">Payments</a>
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <h1 className="font-semibold uppercase">Resources</h1>
                            <a href="#" className="text-gray-600 hover:text-black">Free eBooks</a>
                            <a href="#" className="text-gray-600 hover:text-black">Development Tutorial</a>
                            <a href="#" className="text-gray-600 hover:text-black">How to - Blog</a>
                            <a href="#" className="text-gray-600 hover:text-black">Youtube Playlist</a>
                        </div>

                    </div>

                </div>

               <div className="w-full border-t border-black my-4"></div>
                <div className="w-full lg:px-10">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-5 py-5">
                    <p className="text-gray-600 text-sm">Mishe.co © 2025, All Rights Reserved</p>
                    <div className="flex gap-x-4">
                        <Image src={CARD} alt="" />
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}