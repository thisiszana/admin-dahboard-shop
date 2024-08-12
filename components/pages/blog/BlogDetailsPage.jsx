import { Suspense } from "react";

import LoaderBar from "@/components/shared/LoaderBar";
import Blog from "./ui/Blog";

export default function BlogDetailsPage({ id }) {
  return (
    <Suspense fallback={<LoaderBar />}>
      <Blog id={id} />
    </Suspense>
  );
}
