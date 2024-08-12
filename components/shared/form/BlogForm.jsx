"use client"

import { useRouter } from "next/navigation";

import { useState } from "react";

import toast from "react-hot-toast";
import { Switch } from "antd";

import KeywordsSelection from "./KeywordsSelection";
import { createBlog } from "@/actions/blog.action";
import DetailedBox from "../layout/DetailedBox";
import CustomTextarea from "./CustomTextarea";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";
import Loader from "../Loader";

export default function BlogForm({ type, form, setForm, onChange }) {
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

  const keywordSelection = (
    <div className="w-full h-full">
      <KeywordsSelection form={form} setForm={setForm} />
    </div>
  );

  const create = async () => {

    if (
      !form.title ||
      !form.description ||
      !form.image ||
      form.keywords.length === 0
    )
      toast.error(MESSAGES.fields);

    setLoading(true);

    const uploadResult = await uploadImage(form.image[0]);

    const res = await createBlog({
      ...form,
      image: uploadResult.imageUrl,
    });

    setLoading(false);

    if (res.code === 200 || res.code === 201 || res.code === 202) {
      toast.success(res.message);
      router.push("/blogs");
    } else {
      toast.error(res.message);
    }
  };
  return (
    <div className="space-y-8">
      <DetailedBox
        title="Basic Details"
        subtitle="Title, description, image"
        content={basicDetails}
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
          onClick={() => create()}
          title={
            loading ? (
              <Loader width={15} height={15} />
            ) : (
              <p>{type === "create" ? "Create Blog" : "Edit Blog"}</p>
            )
          }
        />
      </div>
    </div>
  );
}
