import Link from "next/link";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { productsPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import { LayerPlus } from "@/components/icons/Icon";
import ProductsFilter from "./ui/ProductsFilter";
import { Suspense } from "react";
import ProductsOverview from "./ui/ProductsOverview";
import LoaderBar from "@/components/shared/LoaderBar";

export default async function ProductsPage({ searchParams }) {
  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;
  const category = searchParams?.category || "";
  const stock = searchParams?.stock || "";
  const discount = searchParams?.discount || "";
  const sort = searchParams?.sort || "";
  const published = searchParams?.published || "";

  return (
    <>
      <div className="flex justify-between gap-1">
        <PageHeading title="Products" />
        <Link
          href="/add-product"
          className="h-fit flex items-center gap-3 p-btn rounded-btn bg-dark1 text-white"
        >
          <LayerPlus />
          New
        </Link>
      </div>
      <CustomBreadcrumb items={productsPageBread} />
      <div className="cardShadow3 rounded-2xl border overflow-hidden">
        <ProductsFilter />
        <Suspense
          key={search + page + category + stock + discount + sort + published}
          fallback={<LoaderBar />}
        >
          <ProductsOverview searchParams={searchParams} />
        </Suspense>
      </div>
    </>
  );
}
