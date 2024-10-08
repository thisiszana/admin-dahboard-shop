import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get(
      "https://sorme-shop.vercel.app/api/comments"
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { msg: "Failed to fetch comment", success: false },
        { status: response.status }
      );
    }

    const comments = response.data.comments;

    await connectDB();

    const productIds = comments.map((comment) => comment.productId);

    const products = await ProductAdminSorme.find({
      _id: { $in: productIds },
    })
      .select("image title")
      .lean();

    const combinedData = comments.map((comment) => {
      const product = products.find(
        (p) => p._id.toString() === comment.productId.toString()
      );

      return {
        comment,
        product,
      };
    });
    console.log("server data comments", combinedData);
    const res = NextResponse.json(
      {
        msg: "Comments retrieved successfully",
        success: true,
        combinedData,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (error) {
    console.log("comments error", error);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
