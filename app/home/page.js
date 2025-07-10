// "use client"
import Image from 'next/image'
import HERO from '../../public/heroBg.png'
import STAR1 from '../../public/star1.png'
import STAR2 from '../../public/star2.png'
import B1 from '../../public/brand-logo/1.png'
import B2 from '../../public/brand-logo/2.png'
import B3 from '../../public/brand-logo/3.png'
import B4 from '../../public/brand-logo/4.png'
import B5 from '../../public/brand-logo/5.png'
import PrimaryBtn from '@/components/PrimaryBtn'


export default function Hero() {
    return (
        <>
            <section className='overflow-hidden px-10 w-full h-screen relative pt-28 lg:pt-16 '>
                <div className='relative flex flex-col justify-center items-center lg:flex-row'>
                    <div className='flex flex-col gap-y-7 lg:pt-20 justify-center items-start '>
                        <h1 className='lg:text-7xl text-4xl text-start pt-5 font-bold flex-1'>
                            FIND CLOTHES THAT MATCHES YOUR STYLE
                        </h1>

                        <p className='text-md text-gray-500 text-start'>
                            Browse through our diverse range of meticulously crafted garments,
                            designed to bring out your individuality and cater to your sense of style.
                        </p>

                        <div className='w-full flex justify-start'>
                            {/* <button className='rounded-full bg-black w-full py-3 text-white lg:w-auto px-10'>
                                Shop Now
                            </button> */}
                            <PrimaryBtn className='w-full lg:w-auto'>
                                Shop Now    
                            </PrimaryBtn>
                        </div>

                        <div className='flex flex-wrap gap-x-10 gap-y-5 justify-center items-center'>
                            <div className='flex flex-col'>
                                <div className='flex'>
                                    <h1 className='lg:text-4xl text-3xl  font-semibold'>200</h1>
                                    <p className='lg:text-4xl text-3xl  font-semibold'>+</p>
                                </div>
                                <p className='text-gray-500 lg:text-sm text-xs'>International Brands</p>
                            </div>

                            <div className='p-[1px] h-16 hidden lg:block bg-gray-200'></div>

                            <div className='flex flex-col'>
                                <div className='flex'>
                                    <h1 className='lg:text-4xl text-3xl  font-semibold'>2,000</h1>
                                    <p className='lg:text-4xl text-3xl  font-semibold'>+</p>
                                </div>
                                <p className='text-gray-500 lg:text-sm text-xs'>High-Quality Products</p>
                            </div>

                            <div className='p-[1px] h-16 hidden lg:block bg-gray-200'></div>

                            <div className='flex flex-col'>
                                <div className='flex'>
                                    <h1 className='lg:text-4xl text-3xl  font-semibold'>30,000</h1>
                                    <p className='lg:text-4xl text-3xl  font-semibold'>+</p>
                                </div>
                                <p className='text-gray-500 lg:text-sm text-xs'>Happy Customers</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex w-full'>
                        <Image src={HERO} className='relative z-30' alt="" />
                        <div className=' flex flex-col'>
                            <Image src={STAR1} className='absolute lg:hidden right-[0px]' alt="" />
                            <Image src={STAR2} className='absolute lg:hidden left-[0px] bottom-[200px]' alt="" />
                            <Image src={STAR1} className='absolute hidden lg:flex lg:right-[60px] lg:top-[50px]' alt="" />
                            <Image src={STAR2} className='absolute hidden lg:flex lg:right-[500px] lg:top-[360px] ' alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className='overflow-hidden flex items-center justify-evenly w-full lg:h-[15vh] py-6 lg:p-0 bg-black'>
                <div className='flex justify-evenly items-center w-full '>
                    <Image src={B1} className='lg:w-auto w-12' alt="" />
                    <Image src={B2} className='lg:w-auto w-12' alt="" />
                    <Image src={B3} className='lg:w-auto w-12' alt="" />
                    <Image src={B4} className='lg:w-auto w-12' alt="" />
                    <Image src={B5} className='lg:w-auto w-12' alt="" />
                </div>
            </section>
        </>
    )
}