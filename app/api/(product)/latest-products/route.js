import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

export async function GET(req) {
  if (req.method === "GET") {
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
      const products = await ProductAdminSorme.find({
        stock: { $gt: 0 },
        published: true,
      })
        .limit(8)
        .sort({ createdAt: -1 })
        .lean();

      const response = NextResponse.json(
        {
          products,
          status: "success",
        },
        { code: 200 }
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
}
