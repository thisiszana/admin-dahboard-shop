"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { sign } from "jsonwebtoken";

import { SECRET_KEY, SESSION_EXPIRATION } from "@/utils/var";
import { hashedPassword, verifyPassword } from "@/utils/fun";
import { MESSAGES, STATUS_CODES } from "@/utils/message";
import { getServerSession } from "@/utils/session";
import AdminSorme from "@/models/adminSorme";
import connectDB from "@/utils/connectDB";
import { ProductAdminSorme } from "@/models/productAdminSorme";

export const getAdmins = async () => {
  try {
    await connectDB();

    const admins = await AdminSorme.find().select("-password").lean();

    return {
      admins,
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

export const getAdmin = async (id) => {
  try {
    await connectDB();

    const admin = await AdminSorme.findById(id)
      .populate({
        path: "productsCreated",
        model: ProductAdminSorme,
      })
      .select("-password")
      .lean();

    return {
      admin,
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

export const updateProfile = async (data) => {
  try {
    await connectDB();

    const {
      username,
      newPassword,
      currentPassword,
      firstName,
      lastName,
      email,
      gender,
      phoneNumber,
      address,
      country,
      image,
    } = data;
    console.log(data);

    const session = getServerSession();

    const admin = await AdminSorme.findById(session.userId);

    if (!admin) {
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };
    }

    if (!username || !firstName) {
      return {
        message: MESSAGES.badRequest,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    }

    if (newPassword) {
      const isValidPass = await verifyPassword(currentPassword, admin.password);

      if (!isValidPass) {
        return {
          message: MESSAGES.noMatchPassword,
          status: MESSAGES.failed,
          code: STATUS_CODES.badRequest,
        };
      } else {
        const hashPass = await hashedPassword(newPassword);
        admin.password = hashPass;
      }
    }

    if (username !== admin.username) {
      const isUsernameExist = await AdminSorme.findOne({ username });

      if (isUsernameExist) {
        return {
          message: MESSAGES.user_exist,
          status: MESSAGES.failed,
          code: STATUS_CODES.exist,
        };
      } else {
        admin.username = username;
      }
    }

    if (image && image.length !== 0) admin.image = image;

    admin.firstName = firstName;
    admin.lastName = lastName;
    admin.gender = gender;
    admin.email = email;
    admin.phoneNumber = phoneNumber;
    admin.address = address;
    admin.country = country;
    await admin.save();

    const accessToken = sign(
      {
        username,
        userId: admin._id,
        firstName: firstName,
        image: image && image.length !== 0 ? image : admin.image,
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

    revalidatePath("/account");

    return {
      message: MESSAGES.updateProfile,
      status: MESSAGES.update,
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

export const getCurrentAdmin = async () => {
  try {
    await connectDB();

    const session = getServerSession();

    if (!session)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    const currentAdmin = await AdminSorme.findById(session.userId)
      .select("-password")
      .lean();

    if (!currentAdmin)
      return {
        message: MESSAGES.userNotFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    return {
      currentAdmin,
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

export const changeRole = async (data) => {
  try {
    await connectDB();

    const { role, userId } = data;

    const admin = await AdminSorme.findById(userId);

    if (!admin)
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };

    admin.roll = role;
    admin.save();

    revalidatePath("/account");

    return {
      message: MESSAGES.updateRole,
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

export const deleteAdmin = async (id) => {
  try {
    await connectDB();

    const { userId } = id;

    const session = getServerSession();

    if (!session || session.roll !== "OWNER") {
      return {
        message: MESSAGES.unAuthorized,
        status: MESSAGES.failed,
        code: STATUS_CODES.unAuthorized,
      };
    }

    await AdminSorme.findByIdAndDelete(userId);

    revalidatePath("/account");

    return {
      message: MESSAGES.deleteAdmin,
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
