"use server";

import AdminSorme from "@/models/adminSorme";
import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export const createProduct = async (data) => {
  try {
    await connectDB();

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

    const admin = await AdminSorme.findById(session.userId);

    const {
      title,
      description,
      image,
      price,
      stock,
      discount,
      category,
      keywords,
      brand,
      published,
    } = data;

    console.log(image)

    const newProduct = await ProductAdminSorme.create({
      title,
      description,
      image,
      price,
      stock,
      discount,
      category,
      keywords,
      brand,
      published,
      createdBy: session.userId,
    });

    admin.productsCreated.push(newProduct._id);
    await admin.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.productCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log(error);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
