// models/Order.js

import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: String,
    email: String,
    city: String,
    postalCode: String,
    address: String,
    phone: String,
    paid: Boolean,
    cartProducts: [String],
}, {
    timestamps: true,
});
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);