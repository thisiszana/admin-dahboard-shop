import AdminSorme from "@/models/adminSorme";
import { NextResponse } from "next/server";
import connectDB from "@/utils/connectDB";
import TaskSorme from "@/models/task";

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
    const task = await TaskSorme.findById(id)
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image",
      })
      .lean();

    return NextResponse.json(
      { msg: "Success", success: true, task },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
