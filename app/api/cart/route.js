import { NextResponse } from 'next/server';
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";
import mongoose from 'mongoose';

export async function POST(req) {
    await mongooseConnect();

    const body = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids)) {
        return NextResponse.json({ message: "Invalid IDs" }, { status: 400 });
    }

    // ✅ Only use valid ObjectId strings
    const validIds = ids.filter(id => mongoose.Types.ObjectId.isValid(id));

    try {
        const products = await Product.find({ _id: { $in: validIds } });
        return NextResponse.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
    }
}
