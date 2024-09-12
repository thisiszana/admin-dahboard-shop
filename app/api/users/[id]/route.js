import { MESSAGES, STATUS_CODES } from "@/utils/message";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req, { params: { id } }) {
  try {
    const response = await axios.get(
      `https://sorme-shop.vercel.app/api/user/${id}`
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
        user: response.data,
      },
      { status: 200 }
    );

    res.headers.set("Cache-Control", "no-store");
    return res;
  } catch (error) {
    console.log("eror in server user id", error.message)
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
