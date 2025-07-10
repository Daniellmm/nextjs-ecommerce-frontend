// components/sections/NewProductsSection.js
import { Suspense } from 'react';
import NewProduct from '@/components/NewProduct';
import { NewProductSkeleton } from '@/components/skeletons/ProductSkeleton';
import { getNewProducts } from '@/lib/cache';

async function NewProductsContent() {
    const newProducts = await getNewProducts();
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

