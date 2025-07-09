// lib/cache.js
import { unstable_cache } from 'next/cache';
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

// Cache new products for 30 minutes
export const getCachedNewProducts = unstable_cache(
  async () => {
    try {
      await mongooseConnect();
      const products = await Product.find({}, null, {
        sort: { createdAt: -1 }, 
        limit: 4 
      }).lean();
      
      return JSON.parse(JSON.stringify(products));
    } catch (error) {
      console.error('Error fetching new products:', error);
      return [];
    }
  },
  ['new-products'],
  { 
    revalidate: 1800, // 30 minutes
    tags: ['products', 'new-products']
  }
);


export const getCachedTopSellingProducts = unstable_cache(
  async () => {
    try {
      await mongooseConnect();
      const products = await Product.find(
        { topSelling: true }, 
        null, 
        { 
          sort: { topSelling: -1, price: 1 }, 
          limit: 4 
        }
      ).lean();
      
    //   console.log('Top Selling Products:', products);
      return JSON.parse(JSON.stringify(products));
    } catch (error) {
      console.error('Error fetching top selling products:', error);
      return [];
    }
  },
  ['top-selling-products'],
  { 
    revalidate: 1800, // 30 minutes
    tags: ['products', 'top-selling']
  }
);

// Cache all products for product browsing (longer cache)
export const getCachedAllProducts = unstable_cache(
  async (category = null, limit = 20) => {
    try {
      await mongooseConnect();
      const query = category ? { category } : {};
      const products = await Product.find(query, null, {
        sort: { createdAt: -1 },
        limit
      }).lean();
      
      return JSON.parse(JSON.stringify(products));
    } catch (error) {
      console.error('Error fetching all products:', error);
      return [];
    }
  },
  ['all-products'],
  { 
    revalidate: 1800, // 30 minutes
    tags: ['products', 'all-products']
  }
);

// Function to revalidate cache when products are updated
export async function revalidateProductCache() {
  const { revalidateTag } = await import('next/cache');
  revalidateTag('products');
}