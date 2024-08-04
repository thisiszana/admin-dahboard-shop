"use server";

import { hashedPassword, verifyPassword } from "@/utils/fun";
import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/var";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import AdminSorme from "@/models/adminSorme";
import connectDB from "@/utils/connectDB";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

export const createAdmin = async (data) => {
  console.log(data);
  try {
    await connectDB();

    const { firstName, lastName, username, password, image, gender } = data;

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
      image,
      gender,
    });

    return {
      message: MESSAGES.register,
      status: MESSAGES.success,
      code: STATUS_CODES.created,
    };
  } catch (error) {
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const loginAdmin = async (data) => {
  try {
    await connectDB();

    const { username, password } = data;

    if (!username || !password)
      return {
        message: MESSAGES.fillInp,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const admin = await AdminSorme.findOne({ username });

    if (!admin)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const isValidPass = await verifyPassword(password, admin.password);

    if (!isValidPass)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    const accessToken = sign(
      {
        username,
        userId: admin._id,
        firstName: admin.firstName,
        avatar: admin.avatar,
        roll: admin.roll,
      },

      SECRET_KEY,
      {
        expiresIn: SESSION_EXPIRATION,
      }
    );

    cookies().set("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + SESSION_EXPIRATION),
      sameSite: "lax",
      path: "/",
    });

    return {
      message: MESSAGES.login,
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
