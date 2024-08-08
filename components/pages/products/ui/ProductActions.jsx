"use client";

import { changeProductStatus } from "@/actions/product.action";
import {
  Draft,
  Edit,
  EyeOpen,
  MenuDots,
  Publish,
  Trash,
} from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import useServerAction from "@/hooks/useCallServerAction";
import { Popover } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function ProductActions({ productId, published }) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const { loading, res } = useServerAction(
    changeProductStatus,
    {
      id: productId,
      published,
    },
    () => onOpenChange()
  );

  const content = loading ? (
    <div className="w-[150px] h-[160px] flex items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="popContainer min-w-[150px]">
      <CustomBtn
        disabled={published || loading}
        title="Publish"
        icon={<Publish />}
        classNames={`popButton ${
          published ? "text-darkGreen bg-lightGreen" : "hoverable"
        }`}
        onClick={res}
      />
      <CustomBtn
        disabled={!published || loading}
        title="Draft"
        icon={<Draft />}
        classNames={`popButton ${
          !published ? "text-darkOrange bg-lightOrange" : "hoverable"
        }`}
        onClick={res}
      />
      <hr />
      <Link href={`/products/${productId}`} className="popButton hoverable">
        <EyeOpen />
        Details
      </Link>
      <Link
        href={`/products/edit/${productId}`}
        className="popButton hoverable"
      >
        <Edit />
        Edit
      </Link>
      <hr />
      <Link href="/">
        <div
          className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn hover:bg-lightRose text-darkRose`}
        >
          <Trash />
          <p>Delete</p>
        </div>
      </Link>
    </div>
  );
  return (
    <div className="flex gap-2">
      <Popover
        open={open}
        onOpenChange={onOpenChange}
        trigger="click"
        placement="leftTop"
        content={content}
        overlayInnerStyle={{
          padding: "0",
        }}
      >
        <CustomBtn icon={<MenuDots />} classNames="iconButton" />
      </Popover>
    </div>
  );
}
