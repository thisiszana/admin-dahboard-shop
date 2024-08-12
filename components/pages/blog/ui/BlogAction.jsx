"use client";
import Link from "next/link";

import { useState } from "react";

import { Popover, Tooltip } from "antd";

import useServerAction from "@/hooks/useCallServerAction";
import { updateBlogStatus } from "@/actions/blog.action";
import CustomBtn from "@/components/shared/CustomBtn";
import BackLink from "@/components/shared/BackLink";
import Loader from "@/components/shared/Loader";
import {
  DownAngle,
  Draft,
  Edit,
  EyeOpen,
  LeftAngle,
  Publish,
} from "@/components/icons/Icon";

export default function BlogAction({ id, isPublished }) {
  const [openPopover, setOpenPopover] = useState(false);

  const { loading: publishLoading, res: publishBlog } = useServerAction(
    updateBlogStatus,
    {
      id,
      action: "publish",
    }
  );

  const { loading: draftLoading, res: draftBlog } = useServerAction(
    updateBlogStatus,
    {
      id,
      action: "draft",
    }
  );

  const popoverContent = (
    <div className="popContainer w-[150px]">
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
          isPublished ? "text-darkGreen bg-lightGreen" : "hoverable"
        }`}
        onClick={() => publishBlog()}
        disabled={publishLoading || draftLoading || isPublished}
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
          !isPublished ? "text-darkGray bg-lightGray" : "hoverable"
        }`}
        onClick={() => draftBlog()}
        disabled={publishLoading || draftLoading || !isPublished}
      />
    </div>
  );

  const onOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  return (
    <div className="w-full flex justify-between items-center gap-3">
      <BackLink icon={<LeftAngle size={10} />} title="Back" href="/blogs" />
      <div className="flex items-center gap-3">
        <Tooltip placement="bottom" title="Go Live">
          <Link href="/" target="_blank">
            <CustomBtn
              icon={<EyeOpen className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
        <Tooltip placement="bottom" title="Edit">
          <Link href={`/blogs/edit/${id}`}>
            <CustomBtn
              icon={<Edit className="text-darkGray" />}
              classNames="iconButton"
            />
          </Link>
        </Tooltip>
        <Popover
          content={popoverContent}
          open={openPopover}
          onOpenChange={onOpenChange}
          trigger="click"
          placement="bottomRight"
          overlayInnerStyle={{
            padding: "0",
          }}
        >
          <CustomBtn
            title={
              <div className="flex items-center gap-3">
                <p>{isPublished ? "Published" : "Draft"}</p>
                <DownAngle size={13} />
              </div>
            }
            classNames="bg-dark1 text-white py-2 px-3.5 rounded-btn"
            onClick={() => setOpenPopover(!openPopover)}
          />
        </Popover>
      </div>
    </div>
  );
}
