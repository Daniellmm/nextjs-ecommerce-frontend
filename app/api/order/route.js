// /app/api/order/route.js

import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";

export async function POST(req) {
    await mongooseConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    Order.find({ user: session.user.id }).sort({ createdAt: -1 });


    const { name, email, city, postalCode, address, phone, cartProducts, paid } = body;

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
}
