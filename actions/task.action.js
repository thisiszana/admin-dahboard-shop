"use server";

import AdminSorme from "@/models/adminSorme";
import TaskSorme from "@/models/task";
import connectDB from "@/utils/connectDB";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import { revalidatePath } from "next/cache";

export const createTask = async (data) => {
  try {
    await connectDB();

    const session = getServerSession();

    const { title, description, status, dueDate } = data;

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

    await TaskSorme.create({
      title,
      description,
      status,
      createdBy: session.userId,
      dueDate,
    });

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskCreated,
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

export const getTasks = async () => {
  try {
    await connectDB();

    const tasks = await TaskSorme.find()
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image roll",
      })
      .lean();

    return {
      tasks: {
        todo: tasks?.filter((task) => task.status === "Todo"),
        progress: tasks?.filter((task) => task.status === "Progress"),
        done: tasks?.filter((task) => task.status === "Done"),
      },
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

export const updateTaskStatus = async (data) => {
  try {
    await connectDB();

    const { id, status } = data;

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

    const task = await TaskSorme.findById(id);

    if (session.userId !== task.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    task.status = status;
    await task.save();

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskUpdated,
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

export const deleteTask = async (data) => {
  try {
    await connectDB();

    const { id } = data;

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

    const task = await TaskSorme.findById(id);

    if (session.userId !== task.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    await TaskSorme.findByIdAndDelete(id);

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskDeleted,
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

export const editTask = async (data) => {
  try {
    await connectDB();

    const { title, description, status, dueDate, id } = data;

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

    const task = await TaskSorme.findById(id);

    if (session.userId !== task.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.forbidden,
      };

    task.title = title;
    task.description = description;
    task.status = status;
    task.dueDate = dueDate;
    await task.save();

    revalidatePath("/tasks");

    return {
      message: MESSAGES.taskEdited,
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

export const upcommingEvents = async () => {
  try {
    await connectDB();

    const tasks = await TaskSorme.find()
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username name avatar roll",
      })
      .sort({ createdAt: -1 })
      .lean();

    return {
      tasks: tasks.splice(0, 4),
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
