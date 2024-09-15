"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";
import { Switch } from "antd";

import DetailedBox from "../layout/DetailedBox";
import CustomTextarea from "./CustomTextarea";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import { createCategory } from "@/actions/category.action";
import { uploadImage } from "@/utils/fun";

export default function CategoryForm({ type, form, setForm, onChange, id }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="name"
        label="Name"
        value={form.name}
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

  const handleSubmit = async () => {
    if (!form.name) return toast.error(MESSAGES.fields);

    setLoading(() => true);

    const uploadResult = await uploadImage(form.image[0]);

    const payload = {
      ...form,
      image: uploadResult.imageUrl,
    };

    let res;

    if (type === "CREATE") {
      res = await createCategory(payload);
    } else {
      res = await editCategory({ ...payload, id });
    }

    setLoading(() => false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
        toast.success(res.message);
        router.push("/categories");
      } else {
        toast.error(res.message);
      }
  };

  return (
    <div className="space-y-8">
      <DetailedBox
        title="Category Details"
        subtitle="Title, description, image"
        content={basicDetails}
      />

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
          title={type === "CREATE" ? "Create Category" : "Edit Category"}
        />
      </div>
    </div>
  );
}
