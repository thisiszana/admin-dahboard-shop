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

    // Loop through orders and items to fetch product details
    for (let order of data.orders) {
      for (let item of order.items) {
        try {
          const product = await ProductAdminSorme.findById(item.productId);
          if (product) {
            // Push the combined details of order and product in one array
            combinedDetails.push({
              // orderId: order._id,
              // orderStatus: order.status,
              // orderSummary: order.summary,
              orders: order,
              ...item, // item details
              product, // product details
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

    // Return the combined array of orders and products
    return NextResponse.json(
      {
        message: "Order details retrieved successfully",
        status: MESSAGES.success,
        code: 200,
        combinedDetails, // orders and product details in a single array
      },
      { status: 200 }
    );
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
