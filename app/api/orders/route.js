import { NextResponse } from "next/server";

import axios from "axios";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";

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
        msg: "Order details retrieved successfully",
        success: true,
        combinedDetails,
      },
      { status: 200 }
    );

    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate"
    );
    return response;
  } catch (error) {
    console.error("orders server error:", error.message);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}
