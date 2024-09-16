"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Switch } from "antd";

import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import CustomTextarea from "./CustomTextarea";
import DetailedBox from "../layout/DetailedBox";
import UploadedImage from "./UploadedImage";
import KeywordsSelection from "./KeywordsSelection";
import toast from "react-hot-toast";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import { createProduct, editProduct } from "@/actions/product.action";
import { getCategories } from "@/actions/category.action";
import CustomSelectCategory from "./CustomSelectCategory";

export default function ProductForm({ type, form, setForm, onChange, id }) {
  const [categories, setCtategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchComments = async () => {
      setLoading(true);
      let details = [];

      const categoridataData = await getCategories();

      details.push(categoridataData.category);

      setCtategories(details);
      setLoading(false);
    };

    fetchComments();
  }, []);

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
      <CustomSelectCategory
        name="category"
        value={form.category}
        label="Category"
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        options={categories.map((c) => c)}
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

  const handleSubmit = async () => {
    if (
      !form.title ||
      !form.description ||
      !form.image ||
      !form.price ||
      !form.stock ||
      !form.category ||
      !form.brand ||
      form.keywords.length === 0
    ) {
      return toast.error(MESSAGES.fields);
    }

    setLoading(true);

    const uploadResult = await uploadImage(form.image[0]);

    const payload = {
      ...form,
      image: uploadResult.imageUrl,
    };

    let res;

    if (type === "CREATE") {
      res = await createProduct(payload);
    } else {
      res = await editProduct({ ...payload, id });
    }

    setLoading(false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/products");
    } else {
      toast.error(res.message);
    }
  };

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
          onClick={handleSubmit}
          title={type === "CREATE" ? "Create Product" : "Edit Product"}
        />
      </div>
    </div>
  );
}
