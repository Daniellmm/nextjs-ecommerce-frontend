import Image from "next/image";

import B1 from '../public/casual.png'
import B2 from '../public/fomal.png'
import B3 from '../public/party.png'
import B4 from '../public/gym.png'

export default function BrowseSection() {
    return (
        <div className="flex flex-col items-center justify-start rounded-4xl lg:bg-[#F0F0F0] lg:mx-20 px-10 py-10">
            <div className='pb-10'>
                <h1 className='font-bold text-2xl lg:text-5xl'>Browse Our Collection</h1>
            </div>
            <div className="flex flex-col gap-6 w-full max-w-6xl">
                <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative">
                        <h1 className="absolute font-semibold text-2xl lg:text-3xl left-7 top-6">
                            Casual
                        </h1>
                        <Image src={B1} alt='' className="rounded-2xl" />
                    </div>
                    <div className="relative">
                        <h1 className="absolute font-semibold text-2xl lg:text-3xl left-7 top-6">
                            Formal
                        </h1>
                        <Image src={B2} alt='' className="rounded-2xl" />
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="relative flex-2">
                        <h1 className="absolute font-semibold text-2xl lg:text-3xl left-7 top-6">
                            Party
                        </h1>
                        <Image src={B3} alt='' className="rounded-2xl w-full" />
                    </div>

                    <div className="relative flex-1">
                        <h1 className="absolute font-semibold text-2xl lg:text-3xl left-7 top-6">
                            Gym
                        </h1>
                        <Image src={B4} alt='' className="rounded-2xl w-full h-full" />
                    </div>
                </div>
            </div>

            {/* <div className="">

            </div> */}

        </div>
    )
}