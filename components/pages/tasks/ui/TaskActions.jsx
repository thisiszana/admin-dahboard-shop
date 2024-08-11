"use client";

import { deleteTask, updateTaskStatus } from "@/actions/task.action";
import { CircleCheck, MenuDots, Trash } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import Loader from "@/components/shared/Loader";
import useServerAction from "@/hooks/useCallServerAction";
import { Popover } from "antd";
import { useState } from "react";

export default function TaskActions({ id, currentStatus }) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const closePopover = () => {
    setIsPopoverOpen(false);
  };
  const onOpenChange = (newOpen) => {
    setIsPopoverOpen(newOpen);
  };

  const { loading: todoLoading, res: todoRes } = useServerAction(
    updateTaskStatus,
    {
      id,
      status: "Todo",
    },
    () => closePopover()
  );

  const { loading: progressLoading, res: progressRes } = useServerAction(
    updateTaskStatus,
    {
      id,
      status: "Progress",
    },
    () => closePopover()
  );

  const { loading: doneLoading, res: doneRes } = useServerAction(
    updateTaskStatus,
    {
      id,
      status: "Done",
    },
    () => closePopover()
  );

  const { loading: deleteLoading, res: deleteRes } = useServerAction(
    deleteTask,
    {id},
    () => closePopover()
  );

  const popoverContent = (
    <div className="popContainer w-[200px] min-h-[150px] flex flex-col justify-center items-center">
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Todo" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          todoLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Todo" ? (
            <>
              <CircleCheck size={17} />
              <p>Todo</p>
            </>
          ) : (
            <p>Todo</p>
          )
        }
        onClick={() => todoRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Progress" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          progressLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Progress" ? (
            <>
              <CircleCheck size={17} />
              <p>Progress</p>
            </>
          ) : (
            <p>Progress</p>
          )
        }
        onClick={() => progressRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames={`popButton ${
          currentStatus === "Done" ? "text-darkBlue" : "hoverable"
        }`}
        title={
          doneLoading ? (
            <Loader height={20} width={20} />
          ) : currentStatus === "Done" ? (
            <>
              <CircleCheck size={17} />
              <p>Done</p>
            </>
          ) : (
            <p>Done</p>
          )
        }
        onClick={() => doneRes()}
        disabled={todoLoading || progressLoading || doneLoading}
      />
      <CustomBtn
        classNames="popButton hoverable popButton text-darkRose hover:bg-lightRose Transitio"
        title={
          deleteLoading ? (
            <Loader height={20} width={20} color={"red"} />
          ) : (
            "Delete"
          )
        }
        icon={<Trash size={17} />}
        onClick={() => deleteRes()}
        disabled={
          todoLoading || progressLoading || doneLoading || deleteLoading
        }
      />
    </div>
  );

  return (
    <Popover
      open={isPopoverOpen}
      onOpenChange={onOpenChange}
      content={popoverContent}
      overlayInnerStyle={{
        padding: "0",
      }}
      trigger="click"
      placement="leftTop"
    >
      <CustomBtn
        type="button"
        icon={<MenuDots size={15} />}
        classNames="rounded-full w-[35px] h-[35px] flex items-center justify-center hoverable"
      />
    </Popover>
  );
}
