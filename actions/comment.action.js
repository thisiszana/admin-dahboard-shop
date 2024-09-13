"use server";

import axios from "axios";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { revalidatePath } from "next/cache";

export const commentActions = async ({ id, productId, action, value = "" }) => {
  try {
    const response = await axios.post(
      `https://sorme-shop.vercel.app/api/comments/${id}`,
      {
        action,
        value,
      },
      {
        headers: {
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );

    if (response.status === 200 && action === "delete") {
      await connectDB();

      const product = await ProductAdminSorme.findById(productId);
      if (!product) {
        return { success: false, error: "Product not found!" };
      }

      const commentIndex = product.comments.findIndex((comment) =>
        comment.equals(id)
      );

      if (commentIndex !== -1) {
        product.comments.splice(commentIndex, 1);
        await product.save();
      }

      return {
        message: "Comment deleted and removed from product!",
        status: MESSAGES.success,
        code: STATUS_CODES.success,
        data: response.data,
      };
    }

    revalidatePath("/comments");

    return {
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
      data: response.data,
    };
  } catch (error) {
    console.error("Request failed:", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
