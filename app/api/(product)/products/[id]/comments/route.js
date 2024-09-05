import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

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
