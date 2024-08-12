import Link from "next/link";

import  { Suspense } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { blogsPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import LoaderBar from "@/components/shared/LoaderBar";
import { LayerPlus } from "@/components/icons/Icon";
import BlogsList from "./ui/BlogsList";

export default function BlogsPage() {
  return (
    <>
      <PageHeading title="Blogs" />
      <CustomBreadcrumb items={blogsPageBread} />
      <div className="flex w-full justify-end mb-3">
        <Link
          href="/add-blog"
          className="flex items-center gap-2 bg-dark1 text-white p-btn rounded-btn"
        >
          <LayerPlus />
          <span>New Blog</span>
        </Link>
        <Suspense fallback={<LoaderBar />}>
          <BlogsList />
        </Suspense>
      </div>
    </>
  );
}
