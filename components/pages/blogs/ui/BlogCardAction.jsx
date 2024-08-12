"use client";

import Link from "next/link";

import { useState } from "react";

import { Popover } from "antd";

import useServerAction from "@/hooks/useCallServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import {
  Draft,
  Edit,
  EyeOpen,
  MenuDots,
  Publish,
  Trash,
} from "@/components/icons/Icon";

export default function BlogCardAction({ blogId, published }) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const { loading, res } = useServerAction();

  const popoverContent = (
    <div className="popContainer w-[150px]">
      {loading ? (
        <div className="h-[185px] flex items-center justify-center">
          <Loader width={20} height={20} />
        </div>
      ) : (
        <>
          <div>
            <Link href={`/blogs/${blogId}`} className="popButton hoverable">
              <EyeOpen />
              <span>View</span>
            </Link>
            <Link
              href={`/blogs/edit/${blogId}`}
              className="popButton hoverable"
            >
              <Edit />
              <span>Edit</span>
            </Link>
          </div>
          <hr />
          <div>
            <CustomBtn
              icon={<Publish />}
              title="Publish"
              classNames={`popButton ${
                published ? "text-darkGreen bg-lightGreen" : "hoverable"
              }`}
              onClick={() => updateBlog()}
              disabled={loading || published}
            />
            <CustomBtn
              icon={<Draft />}
              title="Draft"
              classNames={`popButton ${
                !published ? "text-darkGray bg-lightGray" : "hoverable"
              }`}
              onClick={() => updateBlog()}
              disabled={loading || !published}
            />
          </div>
          <hr />
          <CustomBtn
            icon={<Trash />}
            title="Delete"
            classNames="popButton bg-lightRose text-darkRose"
          />
        </>
      )}
    </div>
  );

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChange}
      content={popoverContent}
      placement="rightTop"
      trigger="click"
      overlayInnerStyle={{
        padding: "0px",
        margin: "0px",
      }}
    >
      <CustomBtn
        icon={<MenuDots size={15} />}
        classNames="iconButton"
        onClick={() => setOpen(!open)}
      />
    </Popover>
  );
}
