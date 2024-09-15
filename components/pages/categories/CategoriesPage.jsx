import Link from "next/link";

import { Suspense } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { categoriesPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import LoaderBar from "@/components/shared/LoaderBar";
import { Category } from "@/components/icons/Icon";
import CategoryList from "./ui/CategoryList";
import { getCategories } from "@/actions/category.action";

export default async function CategoriesPage() {
  const data = await getCategories();
  return (
    <>
      <div className="flex justify-between gap-1">
        <PageHeading title="Categories" />
        <Link
          href="/add-category"
          className="h-fit flex items-center gap-3 p-btn rounded-btn bg-dark1 text-white"
        >
          <Category />
          New
        </Link>
      </div>
      <CustomBreadcrumb items={categoriesPageBread} />
      <div className="cardShadow3 rounded-2xl border overflow-hidden">
        <Suspense fallback={<LoaderBar />}>
          <CategoryList category={JSON.parse(JSON.stringify(data.category))} />
        </Suspense>
      </div>
    </>
  );
}
