import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
    name: String,
    email: String,
    city: String,
    postalCode: String,
    address: String,
    phone: String,
    paid: Boolean
}, {
    timestamps: true,
});
export const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);