"use client";

import { useState } from "react";
import Link from "next/link";
import { Modal, Popover } from "antd";
import {
  CircleCheck,
  CircleClose,
  EyeOpen,
  MenuDots,
  Trash,
} from "@/components/icons/Icon";
import { changeRole, deleteAdmin } from "@/actions/admin.action";
import useServerAction from "@/hooks/useCallServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";

export default function AdminActions({ roll, userId, showMore }) {
  const [open, setOpen] = useState(false);
  const [adminContentInfo, setAdminContentInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const onOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onOpen = () => {
    setOpen(!open);
  };

  const onClose = () => {
    setOpen(!open);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
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

  const handleDeleteAdmin = async () => {
    setDeleteLoading(() => true);

    const res = await deleteAdmin({ userId });

    if (res.hasContent) {
      setAdminContentInfo(res.contentInfo);
      setDeleteLoading(() => false);
      openModal();
    } else if (res.status === "success") {
      setDeleteLoading(() => false);
      onClose();
    } else {
      setDeleteLoading(() => false);
    }
  };

  const { loading: deleteAdminLoading, res: deleteAdminRes } = useServerAction(
    deleteAdmin,
    {
      userId,
      forceDelete: true,
    },
    () => {
      closeModal();
      onClose();
    }
  );

  const content = (
    <div className="popContainer w-[150px] min-h-[100px] flex flex-col justify-center items-center">
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
        disabled={roll === "ADMIN" || makeAdminLoading || makeUserLoading}
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
        disabled={roll === "USER" || makeAdminLoading || makeUserLoading}
        onClick={() => makeUserRes()}
      />
      <div className="bg-gray-200 w-full h-[1px]" />
      <CustomBtn
        title={
          deleteLoading ? (
            <Loader height={20} width={20} color="red" />
          ) : (
            <>
              <Trash />
              <p>DELETE</p>
            </>
          )
        }
        classNames="popButton text-darkRose hover:bg-lightRose Transition"
        disabled={makeAdminLoading || makeUserLoading || deleteAdminLoading}
        onClick={handleDeleteAdmin}
      />
    </div>
  );

  const modalTitle = (
    <div className="flex items-center justify-between border-b pb-3 mb-5">
      <p className="text-p1 font-medium">Delete Admin</p>
      {/* <CustomBtn
        icon={<CircleClose />}
        classNames="hoverable"
        onClick={closeModal}
      /> */}
    </div>
  );

  return (
    <>
      <div className="flex items-center gap-1">
        <Link href={`/account/admin/${userId}`} className="iconButton">
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
      <Modal
        title={modalTitle}
        onCancel={closeModal}
        open={isModalOpen}
        footer={null}
      >
        <p className="text-p1 text-center">
          This admin has {adminContentInfo?.blogsCreated?.length || 0} 
          blogs and {adminContentInfo?.productsCreated?.length || 0}  products created. Are
          you sure you want to delete?
        </p>
        <div className="flex justify-between mt-5">
          <CustomBtn
            title={
              deleteAdminLoading ? (
                <Loader height={20} width={20} color="red" />
              ) : (
                "Delete"
              )
            }
            classNames="py-1.5 px-3 rounded-btn flex items-center gap-4 text-darkRose hover:bg-lightRose Transition"
            onClick={() => deleteAdminRes()}
          />
          <CustomBtn
            title="Cancel"
            classNames="hoverable py-1.5 px-3 rounded-btn flex items-center gap-4 text-darkBlue Transition"
            onClick={closeModal}
          />
        </div>
      </Modal>
    </>
  );
}
