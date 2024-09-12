import { Suspense } from "react";

import Order from "./ui/Order";
import LoaderBar from "@/components/shared/LoaderBar";

export default function OrderDetailsPage({ id }) {
  return (
    <Suspense fallback={<LoaderBar />}>
      <Order id={id} />
    </Suspense>
  );
}
