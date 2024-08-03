"use server";

import AdminSorme from "@/models/adminSorme";
import connectDB from "@/utils/connectDB";
import { hashedPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";

export const createAdmin = async (data) => {
  try {
    await connectDB();

    const { firstName, lastName, username, password } = data;

    if (!firstName || !username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const existingUser = await AdminSorme.findOne({ username });
    if (existingUser)
      return {
        message: MESSAGES.user_exist,
        status: MESSAGES.failed,
        code: STATUS_CODES.exist,
      };

    const hashPassword = await hashedPassword(password);

    await AdminSorme.create({
      firstName,
      lastName,
      username,
      password: hashPassword,
    });

    return {
      message: MESSAGES.register,
      status: MESSAGES.success,
      code: STATUS_CODES.created,
    };
  } catch (error) {
    console.log(error)
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};
