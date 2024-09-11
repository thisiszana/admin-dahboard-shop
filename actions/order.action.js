"use server";

import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import axios from "axios";

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

    const { data } = await axios.get(
      `https://sorme-shop.vercel.app/api/order/${id}`
    );

    let newStatus;

    if (action === "Completed") {
      newStatus = "Completed";
    } else {
      newStatus = "Pending";
    }

    await axios.patch(`https://sorme-shop.vercel.app/api/order/${id}`, {
      status: newStatus,
    });

    return {
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };

    console.log(data);
    console.log(newStatus);
  } catch (error) {
    console.log(error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
