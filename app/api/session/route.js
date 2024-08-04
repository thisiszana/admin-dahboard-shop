import connectDB from "@/utils/connectDB";
import { getServerSession } from "@/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
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
    const session = getServerSession();

    if (!session)
      return NextResponse.json(
        { msg: "UnAuthorized!", success: false },
        { status: 401 }
      );

    return NextResponse.json(
      { msg: "Success", success: true, session },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
