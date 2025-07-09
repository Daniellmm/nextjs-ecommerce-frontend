// components/sections/NewProductsSection.js
import { Suspense } from 'react';
import NewProduct from '@/components/NewProduct';
import { NewProductSkeleton } from '@/components/skeletons/ProductSkeleton';
import { getCachedNewProducts } from '@/lib/cache';

async function NewProductsContent() {
    const newProducts = await getCachedNewProducts();
    // console.log(newProducts);
    return <NewProduct newProducts={newProducts} />;
}

export default function NewProductsSection() {
    return (
        <Suspense fallback={<NewProductSkeleton count={4} />}>
            <NewProductsContent />
        </Suspense>
    );
}

