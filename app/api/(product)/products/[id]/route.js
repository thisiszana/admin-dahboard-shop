import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import { ProductAdminSorme } from "@/models/productAdminSorme";

export async function GET(req, { params: { id } }) {
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
    const product = await ProductAdminSorme.findById(id).lean();

    const response = NextResponse.json(
      { msg: "Success", success: true, product },
      { status: 200 }
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

export async function POST(req, { params: { id } }) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        msg: "Server error!",
        success: false,
      },
      { status: 500 }
    );
  }

  try {
    const { commentId } = await req.json();

    const product = await ProductAdminSorme.findById(id);

    if (!product)
      return NextResponse.json(
        { msg: "Product not found!", success: false },
        { status: 404 }
      );

    product.comments.push(commentId);
    await product.save();

    return NextResponse.json(
      { msg: "Comment added successfully!", success: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
  } catch (error) {
    return NextResponse.json(
      {
        msg: "server Error!",
        success: false,
      },
      { status: 500 }
    );
  }

  try {
    const { productId } = req.query;
    if (!productId)
      return NextResponse.json(
        { msg: "Product ID is required", success: false },
        { status: 400 }
      );

    const { stock, orders } = await req.json();

    const product = await ProductAdminSorme.findById(productId);
    if (!product)
      return NextResponse.json(
        { msg: "Product not found", success: false },
        { status: 404 }
      );

    if (stock !== undefined) product.stock = stock;
    if (orders) product.orders = orders;

    await product.save();

    return NextResponse.json(
      { msg: "Product updated successfully", success: true, product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
