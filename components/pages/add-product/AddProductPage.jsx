"use client";

import { useState } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { addProductPageBread } from "@/constant/breadcrumpItems";
import ProductForm from "@/components/shared/form/ProductForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddProductPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    stock: 0,
    category: "",
    brand: "",
    price: 0,
    discount: 0,
    keywords: [],
    published: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <PageHeading title="Create New Product" />
      <CustomBreadcrumb items={addProductPageBread} />
      <ProductForm
        type="create"
        form={form}
        setForm={setForm}
        onChange={onChange}
      />
    </>
  );
}
