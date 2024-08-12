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
import { deleteBlog, updateBlogStatus } from "@/actions/blog.action";

export default function BlogCardAction({ blogId, published }) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const { loading: publishLoading, res: publishBlog } = useServerAction(
    updateBlogStatus,
    {
      id: blogId,
      action: "publish",
    },
    () => setOpen(false)
  );

  const { loading: draftLoading, res: draftBlog } = useServerAction(
    updateBlogStatus,
    {
      id: blogId,
      action: "draft",
    },
    () => setOpen(false)
  );

  const { loading: deleteLoading, res: deleteBlogg } = useServerAction(
    deleteBlog,
    {
      id: blogId,
      action: "draft",
    },
    () => setOpen(false)
  );

  const popoverContent = (
    <div className="popContainer w-[150px]">
      <div>
        <Link href={`/blogs/${blogId}`} className="popButton hoverable">
          <EyeOpen />
          <span>View</span>
        </Link>
        <Link href={`/blogs/edit/${blogId}`} className="popButton hoverable">
          <Edit />
          <span>Edit</span>
        </Link>
      </div>
      <hr />
      <div>
        <CustomBtn
          title={
            publishLoading ? (
              <Loader height={20} width={20} />
            ) : (
              <>
                <Publish />
                <p>Publish</p>
              </>
            )
          }
          classNames={`popButton ${
            published ? "text-darkGreen bg-lightGreen" : "hoverable"
          }`}
          onClick={() => publishBlog()}
          disabled={publishLoading || draftLoading || published}
        />
        <CustomBtn
          title={
            draftLoading ? (
              <Loader height={20} width={20} />
            ) : (
              <>
                <Draft />
                <p>Draft</p>
              </>
            )
          }
          classNames={`popButton ${
            !published ? "text-darkGray bg-lightGray" : "hoverable"
          }`}
          onClick={() => draftBlog()}
          disabled={publishLoading || draftLoading || !published}
        />
      </div>
      <hr />
      <CustomBtn
        title={
          deleteLoading ? (
            <Loader height={20} width={20} color={"red"} />
          ) : (
            <>
              <Trash size={17} />
              <p>Delete</p>
            </>
          )
        }
        onClick={() => deleteBlogg()}
        classNames="popButton bg-lightRose text-darkRose"
        disabled={publishLoading || draftLoading || deleteLoading}
      />
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
