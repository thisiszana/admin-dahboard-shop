"use server";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const getOrder = async (id) => {
  try {
    const response = await axios.get(
      `https://sorme-shop.vercel.app/api/order/${id}`
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch order");
    }

    const data = response.data;
    let order = data.order;

    for (const item of order.items) {
      const product = await ProductAdminSorme.findById(item.productId).select(
        "title image"
      );
      if (product) {
        item.title = product.title;
        item.image = product.image;
      }
    }

    return {
      order: order,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("error order by id", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const updateOrderStatus = async (order) => {
  try {
    await connectDB();

    const { id, action } = order;

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    let newStatus;

    if (action === "Completed") {
      newStatus = "Completed";
    } else {
      newStatus = "Pending";
    }

    await axios.patch(`https://sorme-shop.vercel.app/api/order/${id}`, {
      status: newStatus,
    });

    revalidatePath("/orders");

    return {
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log(error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
