// import { NextResponse } from "next/server";

// import axios from "axios";

// import { ProductAdminSorme } from "@/models/productAdminSorme";
// import connectDB from "@/utils/connectDB";

// export async function GET() {
//   try {
//     await connectDB();

//     const { data } = await axios.get("https://sorme-shop.vercel.app/api/order");

//     const combinedDetails = [];
//     for (let order of data.orders) {
//       for (let item of order.items) {
//         try {
//           const product = await ProductAdminSorme.findById(item.productId);
//           if (product) {
//             combinedDetails.push({
//               orders: order,
//               product,
//             });
//           }
//         } catch (error) {
//           console.error(
//             `Error fetching details for product ${item.productId}:`,
//             error.message
//           );
//         }
//       }
//     }

//     const response = NextResponse.json(
//       {
//         msg: "Order details retrieved successfully",
//         success: true,
//         combinedDetails,
//       },
//       { status: 200 }
//     );

//     response.headers.set(
//       "Cache-Control",
//       "no-store, no-cache, must-revalidate"
//     );
//     return response;
//   } catch (error) {
//     console.error("orders server error:", error.message);
//     return NextResponse.json(
//       { msg: "Server Error!", success: false },
//       { status: 500 }
//     );
//   }
// }


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
      const orderWithProducts = { ...order, products: [] }; // اضافه کردن یک آرایه‌ی products به هر سفارش

      for (let item of order.items) {
        try {
          const product = await ProductAdminSorme.findById(item.productId);
          if (product) {
            // اضافه کردن محصول به سفارش به جای ایجاد سفارش جدید
            orderWithProducts.products.push({
              product,
              quantity: item.quantity, // اضافه کردن تعداد محصول در صورت نیاز
            });
          }
        } catch (error) {
          console.error(
            `Error fetching details for product ${item.productId}:`,
            error.message
          );
        }
      }

      // اضافه کردن سفارش به لیست نهایی
      combinedDetails.push(orderWithProducts);
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
