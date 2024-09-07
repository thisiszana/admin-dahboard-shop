// pages/api/products/related/[id].js

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectDB();
  } catch (error) {
    console.log("Cannot connect to DB!", error);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }

  try {
    const { id } = params;

    const product = await ProductAdminSorme.findById(id);

    if (!product) {
      return NextResponse.json(
        { msg: "Product not found", success: false },
        { status: 404 }
      );
    }

    const productCategory = product.category;

    const relatedProducts = await ProductAdminSorme.find({
      category: productCategory,
      stock: { $gt: 0 },
      published: true,
    }).lean();

    const response = NextResponse.json(
      {
        msg: "Success",
        success: true,
        relatedProducts,
      },
      { status: 200 }
    );

    response.headers.append("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.log("Error finding related products:", error.message);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
