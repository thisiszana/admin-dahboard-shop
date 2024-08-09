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
    return {
      message: MESSAGES.server,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProducts = async (searchParams) => {
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

    const { page, search, stock, discount, sort, category, published } =
      searchParams;

    let query = {};
    let filters = {};

    if (search) {
      query = { $text: { $search: search } };
    }

    if (stock) {
      stock == "in-stock" ? (filters.stock = { $gt: 0 }) : (filters.stock = 0);
    }

    if (discount) {
      discount == "has-discount"
        ? (filters.discount = { $gt: 0 })
        : (filters.discount = 0);
    }

    if (category) {
      filters.category = category;
    }

    if (published) {
      published === "true"
        ? (filters.published = true)
        : (filters.published = false);
    }

    const pageNumber = page || 1;
    const perPage = 5;
    const totalProductsWithoutFilter = await ProductAdminSorme.countDocuments();
    const totalProducts = await ProductAdminSorme.countDocuments({
      ...query,
      ...filters,
    });
    const totalPages = Math.ceil(totalProducts / perPage);

    const products = await ProductAdminSorme.find({ ...filters, ...query })
      .sort({
        ...(sort == 1
          ? { createdAt: -1 }
          : sort == 2
          ? { createdAt: 1 }
          : sort == 3
          ? { price: -1 }
          : sort == 4
          ? { price: 1 }
          : sort == 5
          ? { orders: -1 }
          : {}),
      })
      .skip((pageNumber - 1) * perPage)
      .limit(perPage)
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName image",
      })
      .lean();

    return {
      products,
      totalPages,
      totalProducts,
      totalProductsWithoutFilter,
      status: "success",
      code: 200,
    };
  } catch (error) {
    return {
      products: null,
      status: MESSAGES.failed,
      code: STATUS_CODES.server,
    };
  }
};

export const getProduct = async (id) => {
  try {
    await connectDB();

    const product = await ProductAdminSorme.findById(id)
      .populate({
        path: "createdBy",
        model: AdminSorme,
        select: "username firstName avatar",
      })
      .lean();

    return {
      product,
      message: MESSAGES.success,
      status: MESSAGES.success,
      code: STATUS_CODES.success,
    };
  } catch (error) {
    throw new Error(error);
  }
};

export const changeProductStatus = async (data) => {
  try {
    await connectDB();

    const { id, action } = data;

    const product = await ProductAdminSorme.findById(id);

    if (action === "publish") {
      product.published = true;
      await product.save();
    } else if (action === "draft") {
      product.published = false;
      await product.save();
    }

    revalidatePath("products");

    return {
      message: MESSAGES.update,
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

export const editProduct = async (data) => {
  try {
    await connectDB();

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
      id,
    } = data;

    if (
      !title ||
      !description ||
      !price ||
      !stock ||
      !category ||
      !brand ||
      keywords.length === 0 ||
      !id
    )
      return {
        message: MESSAGES.fields,
        status: MESSAGES.updated,
        code: STATUS_CODES.updated,
      };

    const product = await ProductAdminSorme.findById(id);

    let newImage;

    if (!product.image && !image) {
      return {
        message: MESSAGES.image,
        status: MESSAGES.failed,
        code: STATUS_CODES.badRequest,
      };
    } else if (image) {
      newImage = image;
    } else {
      newImage = product.image;
    }

    const newKeywords = [...product.keywords, ...keywords];
    console.log(newKeywords);

    product.title = title;
    product.description = description;
    product.image = newImage;
    product.price = price;
    product.stock = stock;
    product.discount = discount;
    product.category = category;
    product.keywords = newKeywords;
    product.brand = brand;
    product.published = published;

    await product.save();

    revalidatePath("/products");

    return {
      message: MESSAGES.productEdited,
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

export const deleteProduct = async (data) => {
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

    const product = await ProductAdminSorme.findById(data.id);

    if (!product)
      return {
        message: MESSAGES.notFound,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    console.log(session.userId, product.createdBy.toString());

    if (session.userId !== product.createdBy.toString())
      return {
        message: MESSAGES.forbidden,
        status: MESSAGES.failed,
        code: STATUS_CODES.not_found,
      };

    await ProductAdminSorme.findByIdAndDelete(data.id);

    revalidatePath("/products");

    return {
      message: MESSAGES.delete,
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
