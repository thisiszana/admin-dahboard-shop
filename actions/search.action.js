"use server";

import { ProductAdminSorme } from "@/models/productAdminSorme";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import AdminSorme from "@/models/adminSorme";
import { BlogSorme } from "@/models/blog";
import connectDB from "@/utils/connectDB";
import TaskSorme from "@/models/task";

export const searchDashboard = async (searchQuery) => {
  try {
    await connectDB();
    let query = { $text: { $search: searchQuery } };

    const products = await ProductAdminSorme.find(query).lean();
    const blogs = await BlogSorme.find(query).lean();
    const tasks = await TaskSorme.find(query)
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image",
      })
      .lean();

    const admins = await AdminSorme.find(query).lean();
    return {
      result: {
        products,
        blogs,
        tasks,
        users,
        admins,
        searchQuery,
      },
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
