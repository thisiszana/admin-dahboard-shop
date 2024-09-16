import CategorySorme from "@/models/CategorySorme";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";

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
      const category = await CategorySorme.findById(id).lean();
  
      const response = NextResponse.json(
        { msg: "Success", success: true, category },
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