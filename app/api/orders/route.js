import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const { data } = await axios.get("https://sorme-shop.vercel.app/api/order");

    const combinedDetails = [];
    for (let order of data.orders) {
      for (let item of order.items) {
        try {
          const product = await ProductAdminSorme.findById(item.productId);
          if (product) {
            combinedDetails.push({
              orders: order,
              ...item,
              product,
            });
          }
        } catch (error) {
          console.error(
            `Error fetching details for product ${item.productId}:`,
            error.message
          );
        }
      }
    }

    const response = NextResponse.json(
      {
        message: "Order details retrieved successfully",
        status: MESSAGES.success,
        code: 200,
        combinedDetails,
      },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch (error) {
    console.error("orders server error:", error.message);
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
