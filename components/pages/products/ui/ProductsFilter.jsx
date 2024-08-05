"use client";

import CustomInp from "@/components/shared/form/CustomInp";
import { useState } from "react";

export default function ProductsFilter() {
  const [query, setQuery] = useState("");
  const [form, setForm] = useState({
    has_selling_stock: false,
    sort: "",
    category: "",
    has_discount: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="p-4 w-full">
      <div className="flex flex-wrap gap-4 w-full">
        <CustomInp
          type="text"
          label="Search"
          wrapperClassName="min-w-[200px] flex flex-1"
        />
      </div>
    </div>
  );
}
