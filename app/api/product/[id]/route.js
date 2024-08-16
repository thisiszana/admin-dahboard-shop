import { NextResponse } from "next/server";

import connectDB from "@/utils/connectDB";
import { ProductAdminSorme } from "@/models/productAdminSorme";

export default async function GET(req, { params: { id } }) {
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
    
    return NextResponse.json(
      { msg: "Success", success: true, product },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
