// /app/api/order/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export async function POST(req) {
    try {
        await mongooseConnect();
        const session = await getServerSession(authOptions);

        if (!session) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { name, email, city, postalCode, address, phone, cartProducts, paid } = body;

        // Validate required fields
        if (!name || !email || !city || !postalCode || !address || !phone || !cartProducts) {
            return Response.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Create the order
        await Order.create({
            user: session.user.id,
            name,
            email,
            city,
            postalCode,
            address,
            phone,
            cartProducts,
            paid: paid ?? false
        });

        return Response.json({ status: "success" });
        
    } catch (error) {
        console.error('Order creation error:', error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}