"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Switch } from "antd";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import CustomSelect from "./CustomSelect";
import CustomTextarea from "./CustomTextarea";
import DetailedBox from "../layout/DetailedBox";
import UploadedImage from "./UploadedImage";
import KeywordsSelection from "./KeywordsSelection";
import { categories } from "@/constant";

export default function ProductForm({ type, form, setForm, onChange }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="title"
        label="Title"
        value={form.title}
        onChange={onChange}
      />
      <CustomTextarea
        name="description"
        label="Description"
        value={form.description}
        onChange={onChange}
      />
      <UploadedImage form={form} setForm={setForm} />
    </div>
  );

  const properties = (
    <div className="flex flex-wrap gap-box w-full h-full">
      <CustomInp
        type="number"
        name="price"
        value={form.price}
        label="$ Price"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomInp
        type="number"
        name="stock"
        value={form.stock}
        label="Stock"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomInp
        type="number"
        name="discount"
        value={form.discount}
        label="% Discount"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomSelect
        name="category"
        value={form.category}
        label="Category"
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        options={categories.map((c) => c.query)}
      />
      <CustomInp
        type="text"
        name="brand"
        value={form.brand}
        label="Brand Name"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
    </div>
  );

  const keywordSelection = (
    <div className="w-full h-full">
      <KeywordsSelection form={form} setForm={setForm} />
    </div>
  );
  return (
    <div className="space-y-8">
      <DetailedBox
        title="Basic Details"
        subtitle="Title, description, image"
        content={basicDetails}
      />
      <DetailedBox
        title="Properties"
        subtitle="Price, Stock, Discount, ..."
        content={properties}
      />
      <DetailedBox title="Keywords" content={keywordSelection} />
      <div className="flex items-center justify-end gap-10">
        <div className="flex items-center gap-2">
          <Switch
            id="publish"
            defaultChecked
            onChange={(checked) => {
              setForm({ ...form, published: checked });
            }}
            value={form.published}
            name="published"
          />
          <label htmlFor="publish" className="text-p1">
            Publish
          </label>
        </div>

        <CustomBtn
          classNames={`${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          } flex items-center justify-center w-[150px] h-[50px] rounded-btn text-p1 font-bold`}
          type="button"
          disabled={loading}
          isLoading={loading}
          onClick={() => create()}
          title={type === "create" ? "Create Product" : "Edit Product"}
        />
      </div>
    </div>
  );
}
