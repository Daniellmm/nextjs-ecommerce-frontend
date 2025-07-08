'use client'
import ProductCard from './ProductCard'
import SecondaryBtn from './SecondaryBtn'

export default function NewProduct({ newProducts }) {
  return (
    <div className="flex flex-col items-center justify-start w-full bg-white px-4 py-10">
      <div className='pb-10'>
        <h1 className='font-bold text-2xl lg:text-5xl capitalize'>New Arrivals</h1>
      </div>

      {/* Scrollable on small screens */}
      <div className="w-full overflow-x-auto px-8">
        <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 w-max sm:w-full">
          {newProducts?.map(product => (
            <div key={product._id} className="min-w-[250px] sm:min-w-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      <div className='pt-10'>
        <SecondaryBtn>
          View All
        </SecondaryBtn>
      </div>
    </div>
  )
}
