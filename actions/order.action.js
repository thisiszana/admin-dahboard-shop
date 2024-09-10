"use server";

import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export const updateOrderStatus = async (data) => {
  try {
    await connectDB();

    const { id, action } = data;

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

    console.log(data)
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
