"use client";

import { commentActions } from "@/actions/comment.action";
import {
  CircleClose,
  Document,
  Edit,
  EyeOpen,
  MenuDots,
  Trash,
} from "@/components/icons/Icon";
import CustomBadge from "@/components/shared/CustomBadge";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomTextarea from "@/components/shared/form/CustomTextarea";
import Loader from "@/components/shared/Loader";
import useServerAction from "@/hooks/useCallServerAction";
import { useCommentAction } from "@/hooks/useCommentAction";
import { QUERY_KEY } from "@/services/queryKey";
import { shorterText } from "@/utils/fun";
import { useQueryClient } from "@tanstack/react-query";
import { Modal, Popover } from "antd";
import { useState } from "react";

const CommentAction = ({ _id, answer, status, published, productId }) => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [value, setValue] = useState(answer);

  const { loading: publishLoading, res: publish } = useCommentAction(
    
    { id: _id, productId, action: "publish" },
    () => {
      queryClient.invalidateQueries([QUERY_KEY.user_comments]);
      closePopover();
    }
  );

  const { loading: draftLoading, res: draft } = useCommentAction(
    
    { id: _id, productId, action: "draft" },
    () => {
      queryClient.invalidateQueries([QUERY_KEY.user_comments]);
      closePopover();
    }
  );

  const { loading: deleteLoading, res: deletingComment } = useServerAction(
    
    { id: _id, productId, action: "delete" },
    () => {
      closePopover();
    }
  );

  const { loading: answerLoading, res: changeAnswer } = useServerAction(
    
    { id: _id, productId, action: "answer", value },
    () => {
      closeModal();
    }
  );

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalTitle = (
    <div className="flex items-center justify-between border-b pb-3">
      <p className="text-p1 font-medium">#{shorterText(_id, 15)}</p>
      <CustomBtn
        disabled={answerLoading}
        icon={<CircleClose />}
        classNames="hoverable"
        onClick={closeModal}
      />
    </div>
  );
  const modalStyles = {
    content: {
      padding: "20px",
    },
    mask: {
      backdropFilter: "blur(10px)",
    },
  };
  const onSubmitModal = (e) => {
    e.preventDefault();

    if (value === answer) return;

    changeAnswer();
  };
  const modalContent = (
    <form className="space-y-5" onSubmit={onSubmitModal}>
      <CustomBadge condition={status === "Answered"} title={status} />
      <CustomTextarea
        label="Your Answer"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="w-full flex justify-end gap-2">
        <CustomBtn
          disabled={answerLoading}
          title="Cancel"
          type="button"
          onClick={closeModal}
          classNames="border p-btn rounded-btn text-p1 hoverable"
        />
        <CustomBtn
          title="Submit"
          isLoading={answerLoading}
          type="submit"
          disabled={answerLoading}
        />
      </div>
    </form>
  );

  const popoverContent = (
    <div className="p-1 flex flex-col gap-1 w-[150px]">
      <CustomBtn
        onClick={() => publish()}
        disabled={published || publishLoading}
        classNames="flex justify-center w-full"
        title={
          publishLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn ${
                published && "bg-gray-200"
              }`}
            >
              <EyeOpen />
              <p>Published</p>
            </div>
          )
        }
      />
      <CustomBtn
        onClick={() => draft()}
        disabled={!published || draftLoading}
        classNames="flex justify-center w-full"
        title={
          draftLoading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn ${
                !published && "bg-gray-200"
              }`}
            >
              <Document />
              <p>Draft</p>
            </div>
          )
        }
      />
      <hr />
      <CustomBtn
        onClick={() => deletingComment()}
        disabled={deleteLoading || publishLoading || draftLoading}
        classNames="flex justify-center w-full"
        title={
          deleteLoading ? (
            <Loader width={15} height={15} className="py-1" />
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
  const closePopover = () => {
    setIsPopoverOpen(false);
  };
  const onOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  return (
    <div className="flex items-center gap-1">
      <Modal
        title={modalTitle}
        closeIcon={false}
        open={isModalOpen}
        onCancel={closeModal}
        footer={false}
        styles={modalStyles}
      >
        {modalContent}
      </Modal>
      <CustomBtn
        onClick={openModal}
        icon={<Edit size={18} />}
        classNames="iconButton"
      />
      <Popover
        open={isPopoverOpen}
        onOpenChange={onOpenChange}
        overlayInnerStyle={{
          padding: "0",
        }}
        content={popoverContent}
        trigger="click"
        placement="leftTop"
      >
        <CustomBtn
          type="button"
          icon={<MenuDots size={18} />}
          classNames="iconButton"
        />
      </Popover>
    </div>
  );
};

export default CommentAction;
