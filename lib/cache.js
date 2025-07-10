
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

// Helper function
function serializeProducts(products) {
  return products.map(product => ({
    _id: product._id?.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
    images: product.images,
    discount: product.discount,
    percentage: product.percentage,
    topSelling: product.topSelling,
    createdAt: product.createdAt?.toISOString(),
    updatedAt: product.updatedAt?.toISOString(),
    category: typeof product.category === 'object' && product.category !== null
      ? {
        _id: product.category._id?.toString(),
        name: product.category.name,
      }
      : product.category?.toString() || null,
    properties: product.properties || [],
  }));
}


export async function getNewProducts() {
  try {
    await mongooseConnect();
    const products = await Product.find({}, null, {
      sort: { createdAt: -1 },
      limit: 4,
    }).lean();

    return serializeProducts(products);
  } catch (error) {
    console.error('Error fetching new products:', error);
    return [];
  }
}

export async function getTopSellingProducts() {
  try {
    await mongooseConnect();
    const products = await Product.find(
      { topSelling: true },
      null,
      {
        sort: { createdAt: -1 },
        limit: 4,
      }
    ).lean();

    return serializeProducts(products);
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    return [];
  }
}

export async function getAllProducts(category = null, limit = 20) {
  try {
    await mongooseConnect();
    const query = category ? { category } : {};
    const products = await Product.find(query, null, {
      sort: { createdAt: -1 },
      limit,
    }).lean();

    return serializeProducts(products);
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}
