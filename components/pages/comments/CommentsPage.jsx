import { Suspense } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { commentsPageBread } from "@/constant/breadcrumpItems";
import PageHeading from "@/components/shared/PageHeading";
import CommentsList from "./ui/CommentsList";
import LoaderBar from "@/components/shared/LoaderBar";

export default function CommentsPage() {
  return (
    <>
      <PageHeading title="Comments" />
      <CustomBreadcrumb items={commentsPageBread} />
      <Suspense fallback={<LoaderBar />}>
        <CommentsList />
      </Suspense>
    </>
  );
}
