import { NextResponse } from "next/server";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";

export  async function GET(req) {
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
    const products = await ProductAdminSorme.find({ published: true }).lean();
    const response = NextResponse.json(
      { msg: "Success", success: true, products },
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
