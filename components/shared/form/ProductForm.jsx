"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { HexColorPicker } from "react-colorful";
import toast from "react-hot-toast";
import { Switch } from "antd";

import { createProduct, editProduct } from "@/actions/product.action";
import { getCategories } from "@/actions/category.action";

import CustomSelectCategory from "./CustomSelectCategory";
import KeywordsSelection from "./KeywordsSelection";
import { Trash } from "@/components/icons/Icon";
import DetailedBox from "../layout/DetailedBox";
import CustomTextarea from "./CustomTextarea";
import UploadedImage from "./UploadedImage";
import { MESSAGES } from "@/utils/message";
import { uploadImage } from "@/utils/fun";
import CustomBtn from "../CustomBtn";
import CustomInp from "./CustomInp";

export default function ProductForm({ type, form, setForm, onChange, id }) {
  const [specifications, setSpecifications] = useState(
    form.specifications || [{ label: "", value: "" }]
  );
  const [colors, setColors] = useState([]);
  const [tempColor, setTempColor] = useState(colors[colors.length - 1]);
  const [categories, setCtategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleColorChange = (newColor) => {
    setTempColor(newColor);
  };

  const handleColorSelect = () => {
    if (!colors.includes(tempColor)) {
      const updatedColors = [...colors, tempColor];
      setColors(updatedColors);
      setForm({ ...form, colors: updatedColors });
    }
  };

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

  const handleAddSpecification = () => {
    const allLabelsFilled = specifications.every(
      (spec) => spec.label.trim() !== ""
    );

    if (allLabelsFilled) {
      setSpecifications([...specifications, { label: "", value: "" }]);
    }
  };

  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
    setForm({
      ...form,
      specifications: updatedSpecifications,
    });
  };

  const handleSpecificationChange = (index, field, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index][field] = value;
    setSpecifications(updatedSpecifications);
    setForm({
      ...form,
      specifications: updatedSpecifications,
    });
  };

  const handleRemoveColor = (colorToRemove) => {
    const updatedColors = colors.filter((color) => color !== colorToRemove);
    setColors(updatedColors);
    setForm({ ...form, colors: updatedColors });
  };

  const specificationFields = specifications.map((spec, index) => (
    <div key={index} className="flex gap-4 items-center">
      <CustomInp
        type="text"
        name={`spec-label-${index}`}
        label="Label *"
        value={spec.label}
        onChange={(e) =>
          handleSpecificationChange(index, "label", e.target.value)
        }
        wrapperClassName="flex flex-1"
      />
      <CustomInp
        type="text"
        name={`spec-value-${index}`}
        label="Value *"
        value={spec.value}
        onChange={(e) =>
          handleSpecificationChange(index, "value", e.target.value)
        }
        wrapperClassName="flex flex-1"
      />
      <button
        type="button"
        className="bg-red-500 text-white px-4 py-2 rounded"
        disabled={index === 0}
        onClick={() => handleRemoveSpecification(index)}
      >
        <Trash />
      </button>
    </div>
  ));

  const canAddSpecification = specifications.every(
    (spec) => spec.label.trim() !== ""
  );

  const basicDetails = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="title"
        label="Title *"
        value={form.title}
        onChange={onChange}
      />
      <CustomTextarea
        name="description"
        label="Description *"
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
        label="$ Price  *"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
      <CustomInp
        type="number"
        name="stock"
        value={form.stock}
        label="Stock *"
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
        label="Category *"
        onChange={onChange}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
        options={categories.map((c) => c)}
      />
      <CustomInp
        type="text"
        name="brand"
        value={form.brand}
        label="Brand Name *"
        onChange={onChange}
        min={0}
        wrapperClassName="flex flex-1 xl:min-w-[400px] min-w-[200px]"
      />
    </div>
  );

  const warranty = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="text"
        name="warranty"
        label="Warranty"
        value={form.warranty}
        onChange={onChange}
      />
    </div>
  );

  const reviews = (
    <div className="flex flex-col gap-box w-full h-full">
      <CustomInp
        type="number"
        name="rating"
        label="Rating"
        value={form.reviews?.[0]?.rating}
        onChange={(e) => {
          setForm({
            ...form,
            reviews: [{ ...form.reviews?.[0], rating: e.target.value }],
          });
        }}
        min={0}
        max={5}
      />
      <CustomTextarea
        name="reviews"
        label="Reviews"
        value={form.reviews?.[0]?.review || ""}
        onChange={(e) => {
          setForm({
            ...form,
            reviews: [{ ...form.reviews?.[0], review: e.target.value }],
          });
        }}
      />
    </div>
  );

  const uploadImages = async (images) => {
    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const uploadResult = await uploadImage(image);
        return uploadResult.imageUrl;
      })
    );
    return uploadedImages;
  };

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

    const uploadedImages = await uploadImages(form.image);

    const payload = {
      ...form,
      image: uploadedImages,
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

  // console.log("form", form);

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
      <DetailedBox
        title="Specifications"
        subtitle="Add or remove specifications"
        content={
          <div className="flex flex-col xl:flex-row justify-between items-center gap-8 lg:gap-20">
            <div className="flex flex-col gap-4 w-full">
              {specificationFields}
              <CustomBtn
                classNames={`bg-dark1 text-white px-4 py-2 rounded ${
                  !canAddSpecification ? "opacity-50 cursor-not-allowed" : ""
                }`}
                type="button"
                onClick={handleAddSpecification}
                title="Add"
                disabled={!canAddSpecification}
              />
            </div>
            <div className="flex flex-col items-center w-full lg:w-1/2 mt-6 lg:mt-0">
              <HexColorPicker
                color={tempColor}
                onChange={handleColorChange}
                onMouseUp={handleColorSelect}
              />
              <div className="mt-2 flex flex-wrap gap-2 justify-center w-full lg:w-[200px]">
                {colors.map((color, index) => (
                  <div
                    key={index}
                    className="relative w-8 h-8 rounded-full border"
                    style={{ backgroundColor: color }}
                  >
                    <button
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs"
                      onClick={() => handleRemoveColor(color)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        }
      />

      <DetailedBox
        title="Warranty"
        subtitle="Warranty information"
        content={warranty}
      />
      <DetailedBox
        title="Reviews"
        subtitle="Rating and reviews"
        content={reviews}
      />
      <DetailedBox
        title="Return Policy"
        subtitle="Define the return policy for the product"
        content={
          <div className="flex flex-col gap-box w-full h-full">
            <CustomTextarea
              name="returnPolicy"
              label="Return Policy"
              value={form.returnPolicy || ""}
              onChange={onChange}
              placeholder="Enter the return policy here..."
            />
          </div>
        }
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
