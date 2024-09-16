import axios from "axios";
import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(request, { params }) {
  const { id } = params;
  const { productId, action, value = "" } = await request.json();

  try {
    const response = await axios.post(
      `https://sorme-shop.vercel.app/api/comments/${id}`,
      {
        action,
        value,
      }
    );

    if (response.status === 200 && action === "delete") {
      await connectDB();

      const product = await ProductAdminSorme.findById(productId);
      if (!product) {
        return NextResponse.json(
          { success: false, error: "Product not found!" },
          { status: 404 }
        );
      }

      const commentIndex = product.comments.findIndex((comment) =>
        comment.equals(id)
      );

      if (commentIndex !== -1) {
        product.comments.splice(commentIndex, 1);
        await product.save();
      }

      return NextResponse.json(
        {
          msg: "Comment deleted and removed from product!",
          success: true,
        },
        { status: 200 }
      );
    }

    revalidatePath("/comments");

    const res = NextResponse.json(
      {
        msg: "Comment's details retrieved successfully",
        success: true,
        combinedDetails,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (error) {
    console.error("Request failed:", error.message);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

export async function GET(req, { params: { id } }) {
  try {
    const response = await axios.get(
      `https://sorme-shop.vercel.app/api/comments/${id}`
    );

    if (response.status !== 200) {
      return NextResponse.json(
        { message: "Failed to fetch product" },
        { status: response.status }
      );
    }

    const res = NextResponse.json(
      {
        message: "Success",
        status: "success",
        code: 200,
        comment: response.data,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store, no-cache, must-revalidate");
    return res;
  } catch (error) {
    console.log("error in server user id", error.message);
    return NextResponse.json(
      {
        message: MESSAGES.server,
        status: MESSAGES.failed,
        code: STATUS_CODES.server,
      },
      { status: 500 }
    );
  }
}

