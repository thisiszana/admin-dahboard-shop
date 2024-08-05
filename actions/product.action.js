import { Schema, models, model } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  category: { type: String, required: true },
  keywords: { type: [String], default: [] },
  brand: { type: String, required: true },
  published: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutabale: true,
  },
});

export const ProductAdminSorme =
  models?.ProductAdminSorme || model("ProductAdminSorme", productSchema);
