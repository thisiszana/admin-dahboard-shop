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
    console.log("get category error", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getCategory = async (id) => {
  try {
    await connectDB();

    const category = await CategorySorme.findById(id)
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
    throw new Error(error);
  }
};

export const changeCategoryStatus = async (data) => {
  try {
    await connectDB();

    const { id, action } = data;

    const session = getServerSession();

    const category = await CategorySorme.findById(id);

    if (action === "publish") {
      category.published = true;
      await category.save();
    } else if (action === "draft") {
      category.published = false;
      await category.save();
    }

    if (session.userId !== category.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    revalidatePath("/categories");

    return {
      message: MESSAGES.update,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    console.log("ssssssssssss", error.message);
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const editCategory = async (data) => {
  try {
    await connectDB();

    const { name, description, image, published, id } = data;

    if (!title || !description || !id)
      return {
        message: MESSAGES.fields,
        status: MESSAGES.update,
        code: STATUS_CODES.updated,
      };

    const session = getServerSession();

    if (session.roll === "USER")
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    const category = await CategorySorme.findById(id);

    if (session.userId !== category.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    let newImage;

    if (!category.image && !image) {
      return {
        message: MESSAGES.image,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    } else if (image) {
      newImage = image;
    } else {
      newImage = category.image;
    }

    category.name = name;
    category.description = description;
    category.image = newImage;
    category.published = published;

    await category.save();

    revalidatePath("/categories");

    return {
      message: MESSAGES.categoryEdited,
      status: MESSAGES.success,
      code: STATUS_CODES.updated,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const deleteCategory = async (data) => {
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

    const category = await CategorySorme.findById(data.id);

    if (!category)
      return {
        message: MESSAGES.notFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    if (session.userId !== category.createdBy)
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    if (session.userId !== category.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    await CategorySorme.findByIdAndDelete(data.id);

    revalidatePath("/categories");

    return {
      message: MESSAGES.delete,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
