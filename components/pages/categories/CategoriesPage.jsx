import Link from "next/link";

import { Category, LayerPlus } from "@/components/icons/Icon";
import PageHeading from "@/components/shared/PageHeading";

export default function CategoriesPage() {
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
    </>
  );
}
