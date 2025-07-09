// components/sections/TopSellingSection.js
import { Suspense } from 'react';
import TopSelling from '@/components/TopSelling';
import { ProductGridSkeleton } from '@/components/skeletons/ProductSkeleton';
import { getCachedTopSellingProducts } from '@/lib/cache';

async function TopSellingContent() {
    const topSelling = await getCachedTopSellingProducts();
    // console.log(topSelling)
    return <TopSelling topSelling={topSelling} />;
}

export default function TopSellingSection() {
    return (
        <Suspense fallback={<ProductGridSkeleton count={4} />}>
            <TopSellingContent />
        </Suspense>
    );
}

