"use client";

import { changeProductStatus, deleteProduct } from "@/actions/product.action";
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

  const { loading: publishLoading, res: publish } = useServerAction(
    changeProductStatus,
    {
      id: productId,
      action: "publish",
    },
    () => onOpenChange()
  );
  const { loading: draftLoading, res: draft } = useServerAction(
    changeProductStatus,
    {
      id: productId,
      action: "draft",
    },
    () => onOpenChange()
  );
  const { loading: deleteLoading, res: deletingProduct } = useServerAction(
    deleteProduct,
    {
      id: productId,
    },
    () => onOpenChange()
  );

  const content = (
    <div className="popContainer min-w-[150px]">
      <CustomBtn
        disabled={published || deleteLoading}
        onClick={publish}
        classNames={`popButton flex justify-center w-full ${
          published ? "text-darkGreen bg-lightGreen" : "hoverable"
        }`}
        title={
          publishLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center  gap-4 rounded-btn `}>
              <Publish />
              <p>Publish</p>
            </div>
          )
        }
      />
      <CustomBtn
        disabled={!published || deleteLoading}
        onClick={draft}
        classNames={`popButton flex justify-center w-full ${
          !published ? "text-darkOrange bg-lightOrange" : "hoverable"
        }`}
        title={
          draftLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div className={`flex w-full items-center gap-4`}>
              <Draft />
              <p>Draft</p>
            </div>
          )
        }
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
      <CustomBtn
        onClick={() => deletingProduct()}
        disabled={deleteLoading || draftLoading || publishLoading}
        classNames="flex justify-center w-full"
        title={
          deleteLoading ? (
            <Loader width={15} height={15} color={"red"} className="py-1" />
          ) : (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn hover:bg-lightRose text-darkRose`}
            >
              <Trash />
              <p>Delete</p>
            </div>
          )
        }
      />
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
