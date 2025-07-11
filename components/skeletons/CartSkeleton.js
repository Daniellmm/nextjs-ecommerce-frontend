import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export function CartProductSkeleton() {
  return (
    <div className="w-full flex rounded-lg p-4 gap-4">
      {/* LEFT SIDE */}
      <div className="flex gap-4 w-2/3 items-center">
        <Skeleton height={80} width={80} className="rounded-lg" />
        <div className="flex flex-col gap-2 w-full">
          <Skeleton height={16} width="70%" />
          <Skeleton height={14} width="50%" />
          <Skeleton height={18} width="40%" />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-col justify-center items-end w-1/3 gap-3">
        <Skeleton height={20} width={24} />
        <div className="flex gap-2">
          <Skeleton circle height={24} width={24} />
          <Skeleton height={24} width={24} />
          <Skeleton circle height={24} width={24} />
        </div>
      </div>
    </div>
  );
}

export function OrderSummarySkeleton() {
  return (
    <div className="flex flex-col justify-center items-center w-full lg:w-[40%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3 p-5">
      <Skeleton height={28} width="60%" className="mb-3" />
      <Skeleton height={20} width="100%" />
      <Skeleton height={20} width="100%" />
      <Skeleton height={20} width="100%" />
      <div className="w-full border border-[#F0F0F0]" />
      <Skeleton height={24} width="100%" />
      <div className="w-full flex gap-2 mt-3">
        <Skeleton height={48} width="70%" />
        <Skeleton height={48} width="30%" />
      </div>
      <Skeleton height={48} width="100%" className="mt-3" />
    </div>
  );
}

export function CartSkeleton({ count = 2 }) {
  return (
    <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
      <div className="flex flex-col items-center justify-start w-full min-h-[60vh] lg:px-20 px-5 gap-y-4 pt-24">
        <div className="flex w-full justify-start">
          <Skeleton height={40} width={200} />
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-5">
          {/* Products List Skeleton */}
          <div className="flex flex-col justify-center items-start w-full lg:w-[60%] rounded-4xl border-2 border-[#F0F0F0] gap-y-3">
            {Array.from({ length: count }).map((_, idx) => (
              <CartProductSkeleton key={idx} />
            ))}
          </div>

          {/* Order Summary Skeleton */}
          <OrderSummarySkeleton />
        </div>
      </div>
    </SkeletonTheme>
  );
}
