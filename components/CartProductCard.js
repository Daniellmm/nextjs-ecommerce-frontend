import Image from "next/image";

export default function CartProductCard({ product }) {
    return (
        <div className="w-full flex rounded-lg h-full">
            <div className="flex justify-center items-center gap-x-4">
                {product.images && product.images[0] && (
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        width={100}
                        height={100}
                        className=" rounded-lg object-cover bg-[#F0EEED] shadow-md p-4"
                    />
                )}

                <div className="flex flex-col justify-start items-start gap-y-2 h-full py-2">
                    <h2 className="text-md font-semibold">{product.title}</h2>
                    {product.properties && product.properties[0] && (
                        <p>{product.properties[0]}</p>
                    )}
                    <p></p>
                    <h2 className="text-lg font-semibold">${product.price}</h2>
                </div>
            </div>

            <div className="">

            </div>
        </div>
    )
}