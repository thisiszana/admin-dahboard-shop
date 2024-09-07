import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function POST(req, { params: { id } }) {
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
    const { categoryId } = await req.json();
    const relatedProducts = await ProductAdminSorme.find({
      category: categoryId,
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

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
