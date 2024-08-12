"use server";

import AdminSorme from "@/models/adminSorme";
import { BlogSorme } from "@/models/blog";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";

export const createBlog = async (data) => {
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

    const { title, description, image, keywords, published } = data;

    const newBlog = await BlogSorme.create({
      title,
      description,
      image,
      keywords,
      published,
      createdBy: session.userId,
    });

    admin.blogsCreated.push(newBlog._id);
    await admin.save();

    return {
      message: MESSAGES.blogCreated,
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

export const getBlogs = async () => {
  try {
    await connectDB();

    const blogs = await BlogSorme.find()
      .populate({
        path: "createdBy",
        model: AdminSorme,
      })
      .lean();

    return {
      blogs,
      message: MESSAGES.success,
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
