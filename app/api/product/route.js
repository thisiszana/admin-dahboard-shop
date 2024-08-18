import { NextResponse } from "next/server";
import { ProductAdminSorme } from "@/models/productAdminSorme";
import connectDB from "@/utils/connectDB";

export async function GET(req) {
  try {
    await connectDB();
  } catch (error) {
    console.log("Cannot connect to DB!", error);
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }

  try {
    const searchParams = new URL(req.url).searchParams;

    const search = searchParams.get("search");
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const page = searchParams.get("page") || 1;
    const stock = searchParams.get("stock");
    const discount = searchParams.get("discount");
    const sort = searchParams.get("sort");
    const perPage = 12;

    let filters = { published: true };
    let query = {};

    if (search) {
      query.$text = { $search: search };
    }

    if (stock) {
      stock === "in-stock" ? (filters.stock = { $gt: 0 }) : (filters.stock = 0);
    }

    if (discount) {
      discount === "has-discount"
        ? (filters.discount = { $gt: 0 })
        : (filters.discount = 0);
    }

    if (category) {
      filters.category = category;
    }

    if (minPrice || maxPrice) {
      filters.price = {};
      if (minPrice) filters.price.$gte = minPrice;
      if (maxPrice) filters.price.$lte = maxPrice;
    }

    const totalProductsWithoutFilter = await ProductAdminSorme.countDocuments({ published: true });
    const totalProducts = await ProductAdminSorme.countDocuments({
      ...filters,
      ...query,
    });
    const totalPages = Math.ceil(totalProducts / perPage);

    let sortOptions = {};
    if (sort) {
      sortOptions = {
        ...(sort == "1" ? { createdAt: -1 } : {}),
        ...(sort == "2" ? { createdAt: 1 } : {}),
        ...(sort == "3" ? { price: -1 } : {}),
        ...(sort == "4" ? { price: 1 } : {}),
        ...(sort == "5" ? { orders: -1 } : {}),
      };
    }

    const products = await ProductAdminSorme.find({ ...filters, ...query })
      .sort(sortOptions)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();

    const response = NextResponse.json(
      {
        msg: "Success",
        success: true,
        products,
        totalPages,
        totalProducts,
        totalProductsWithoutFilter,
      },
      { status: 200 }
    );

    response.headers.set("Cache-Control", "no-store");
    return response;
    
  } catch (error) {
    return NextResponse.json(
      { msg: "Server Error!", success: false },
      { status: 500 }
    );
  }
}

