"use client";

import { useEffect, useState } from "react";

import CustomBreadcrumb from "@/components/shared/CustomBreadcrumb";
import { addProductPageBread } from "@/constant/breadcrumpItems";
import ProductForm from "@/components/shared/form/ProductForm";
import PageHeading from "@/components/shared/PageHeading";

export default function AddProductPage({ data }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: data?.image || "",
    stock: 0,
    category: "",
    brand: "",
    price: 0,
    discount: 0,
    keywords: data?.keywords || [],
    published: false,
  });

  console.log(data);

  useEffect(() => {
    if (data) setForm(data);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <>
      <PageHeading title={`${data ? "Edit" : "Add New"} Product`} />
      <CustomBreadcrumb items={addProductPageBread} />
      <ProductForm
        type={`${data ? "EDIT" : "CREATE"}`}
        form={form}
        setForm={setForm}
        onChange={onChange}
        id={data?._id}
      />
    </>
  );
}
