'use client'
import { useRef } from "react";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function CustomerReview() {
    const sliderRef = useRef(null);

    const settings = {
        infinite: true,
        speed: 500,
        centerMode: true,
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplaySpeed: 10000,
        pauseOnHover: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 2, centerMode: false }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1, centerMode: false }
            }
        ]
    };


    return (
        <div className="flex flex-col relative items-start justify-center w-full bg-white px-10 py-10">
            <div className='pb-10 flex justify-between items-end w-full'>
                <h1 className='font-bold text-2xl lg:text-5xl capitalize'>Our Happy <br className="lg:hidden" /> Customers</h1>

                <div className="flex justify-center items-center gap-x-5">
                    {/* Left Arrow */}
                    <button
                        onClick={() => sliderRef.current?.slickPrev()}
                        aria-label="Previous"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    {/* Right Arrow */}
                    <button
                        onClick={() => sliderRef.current?.slickNext()}
                        aria-label="Next"
                        type="button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <Slider ref={sliderRef} {...settings} className="w-full">
                <div className="px-2"><ReviewCard /></div>
                <div className="px-2"><ReviewCard /></div>
                <div className="px-2"><ReviewCard /></div>
                <div className="px-2"><ReviewCard /></div>
                <div className="px-2"><ReviewCard /></div>
                <div className="px-2"><ReviewCard /></div>
            </Slider>


            <div className="hidden lg:block h-48 w-20 absolute top-[130px] left-[10px] bg-white/5 backdrop-blur-[1px] rounded-xl border border-white/20 shadow-lg"></div>
            <div className="hidden lg:block absolute top-32 right-[10px] h-48 w-20 rounded-xl 
                  bg-white/5 backdrop-blur-[1px] border border-white/20 shadow-lg" />
        </div>
    )
}