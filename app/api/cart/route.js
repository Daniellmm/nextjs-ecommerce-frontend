import { NextResponse } from 'next/server';
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Products";

export async function POST(req) {
    await mongooseConnect();

    const body = await req.json();
    const { ids } = body;

    if (!Array.isArray(ids)) {
        return NextResponse.json({ message: "Invalid IDs" }, { status: 400 });
    }

    try {
        const products = await Product.find({ _id: { $in: ids } });
        return NextResponse.json(products);
    } catch (error) {
        return NextResponse.json({ message: "Error fetching products", error }, { status: 500 });
    }
}

export function GET() {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
