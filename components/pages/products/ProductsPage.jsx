import Link from "next/link";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { productsPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import { LayerPlus } from "@/components/icons/Icon";

export default async function ProductsPage() {
    
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
    </>
  );
}
