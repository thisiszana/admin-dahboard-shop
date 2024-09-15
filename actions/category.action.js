"use server";

import AdminSorme from "@/models/adminSorme";
import CategorySorme from "@/models/CategorySorme";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export const createCategory = async (data) => {
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

    const { name, description, image, published } = data;

    const newCategory = await CategorySorme.create({
      name,
      description,
      image,
      published,
      createdBy: session.userId,
    });

    admin.categoryCreated.push(newCategory._id);
    await admin.save();

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryCreated,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("category server error", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getCategories = async () => {
  try {
    await connectDB();

    const category = await CategorySorme.find()
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image",
      })
      .lean();

    return {
      category,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("get category error", error.message)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
