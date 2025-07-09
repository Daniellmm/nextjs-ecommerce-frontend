// components/skeletons/ProductSkeleton.js
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function ProductCardSkeleton() {
  return (
    <div className="min-w-[250px] sm:min-w-0">
      <div className="border rounded-lg p-4 shadow-sm">
        <Skeleton height={200} className="mb-3" />
        <Skeleton height={20} className="mb-2" />
        <Skeleton height={16} width="60%" className="mb-2" />
        <Skeleton height={24} width="40%" />
      </div>
    </div>
  );
}

// New Product section skeleton that matches your exact layout
export function NewProductSkeleton({ count = 4 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="flex flex-col items-center justify-start w-full bg-white px-4 py-10">
        {/* Title skeleton */}
        <div className='pb-10'>
          <Skeleton height={40} width={280} />
        </div>

        {/* Products grid skeleton - matches your responsive layout */}
        <div className="w-full overflow-x-auto scrollbar-hide px-3">
          <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 w-max sm:w-full">
            {Array.from({ length: count }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <div className='pt-10'>
          <Skeleton height={48} width={120} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

// TopSelling section skeleton (similar layout)
export function TopSellingSkeleton({ count = 4 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="flex flex-col items-center justify-start w-full bg-white px-4 py-10">
        {/* Title skeleton */}
        <div className='pb-10'>
          <Skeleton height={40} width={250} />
        </div>

        {/* Products grid skeleton */}
        <div className="w-full overflow-x-auto scrollbar-hide px-3">
          <div className="flex gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4 w-max sm:w-full">
            {Array.from({ length: count }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>

        {/* Button skeleton */}
        <div className='pt-10'>
          <Skeleton height={48} width={120} />
        </div>
      </div>
    </SkeletonTheme>
  );
}

export function ProductGridSkeleton({ count = 4 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </SkeletonTheme>
  );
}

