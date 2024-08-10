"use client";

import { changeRole, deleteAdmin } from "@/actions/admin.action";
import { CircleCheck, EyeOpen, MenuDots, Trash } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import useServerAction from "@/hooks/useCallServerAction";
import { Popover } from "antd";
import Link from "next/link";
import { useState } from "react";

export default function AdminActions({ roll, userId, showMore }) {
  const [open, setOpen] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const onOpen = () => {
    setOpen(!open);
  };
  const onClose = () => {
    setOpen(!open);
  };

  const { loading: makeAdminLoading, res: makeAdminRes } = useServerAction(
    changeRole,
    {
      userId,
      role: "ADMIN",
    },
    () => onClose()
  );

  const { loading: makeUserLoading, res: makeUserRes } = useServerAction(
    changeRole,
    {
      userId,
      role: "USER",
    },
    () => onClose()
  );

  const { loading: deleteAdminLoading, res: deleteAdminRes } = useServerAction(
    deleteAdmin,
    {
      userId,
    },
    () => onClose()
  );

  const content = (
    <div className="popContainer w-[150px] min-h-[100px] flex flex-col justify-center items-center">
      <>
        <CustomBtn
          title={
            roll === "ADMIN" ? (
              <div className="flex items-center gap-2 text-darkBlue">
                <CircleCheck />
                <p>ADMIN</p>
              </div>
            ) : makeAdminLoading ? (
              <Loader height={20} width={20} />
            ) : (
              "ADMIN"
            )
          }
          classNames="popButton hoverable"
          disabled={
            roll === "ADMIN" ||
            makeAdminLoading ||
            makeUserLoading ||
            deleteAdminLoading
          }
          onClick={() => makeAdminRes()}
        />
        <CustomBtn
          title={
            roll === "USER" ? (
              <div className="flex items-center gap-2 text-darkBlue">
                <CircleCheck />
                <p>USER</p>
              </div>
            ) : makeUserLoading ? (
              <Loader height={20} width={20} />
            ) : (
              "USER"
            )
          }
          classNames="popButton hoverable"
          disabled={
            roll === "USER" ||
            makeAdminLoading ||
            makeUserLoading ||
            deleteAdminLoading
          }
          onClick={() => makeUserRes()}
        />
        <div className="bg-gray-200 w-full h-[1px]" />
        <CustomBtn
          title={
            deleteAdminLoading ? (
              <Loader height={20} width={20} />
            ) : (
              <>
                <Trash />
                <p>DELETE</p>
              </>
            )
          }
          classNames="popButton text-darkRose hover:bg-lightRose Transition"
          disabled={makeAdminLoading || makeUserLoading || deleteAdminLoading}
          onClick={() => deleteAdminRes()}
        />
      </>
    </div>
  );
  return (
    <div className="flex items-center gap-1">
      <Link href={`/account/admins/${userId}`} className="iconButton">
        <EyeOpen />
      </Link>
      {showMore && (
        <Popover
          overlayInnerStyle={{
            padding: "0",
          }}
          content={content}
          open={open}
          onOpenChange={onOpenChange}
          trigger="click"
          placement="leftTop"
        >
          <CustomBtn
            type="button"
            icon={<MenuDots size={18} />}
            classNames="iconButton"
            onClick={onOpen}
          />
        </Popover>
      )}
    </div>
  );
}
