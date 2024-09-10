"use client";

import { updateOrderStatus } from "@/actions/order.action";
import {
  CircleCheck,
  CircleClose,
  EyeOpen,
  MenuDots,
} from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useCallServerAction";
import { Popover } from "antd";
import { useState } from "react";

export default function OrdersActions({ orderId, orderStatus }) {
  const [openPopover, setOpenPopover] = useState(false);

  const { loading, res } = useServerAction(
    updateOrderStatus,
    {
      id: orderId,
      action: orderStatus === "Pending" ? "Completed" : "Pending",
    },
    () => setOpenPopover(false)
  );

  const onOpenChange = (newOpen) => {
    setOpenPopover(newOpen);
  };

  const content = (
    <div className="p-1 flex flex-col gap-1 w-[150px]">
      <CustomBtn
        onClick={res}
        classNames="flex justify-center w-full"
        title={
          loading ? (
            <Loader width={15} height={15} className="py-1" />
          ) : orderStatus === "Pending" ? (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn`}
            >
              <CircleCheck />
              <p>Complete</p>
            </div>
          ) : (
            <div
              className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn`}
            >
              <CircleClose />
              <p>Pending</p>
            </div>
          )
        }
      />
      <Link href={`/orders/${orderId}`} classNames="flex justify-center w-full">
        <div
          className={`flex w-full items-center hoverable py-1 px-2 gap-4 rounded-btn ${
            false && "bg-gray-200"
          }`}
        >
          <EyeOpen />
          <p>View</p>
        </div>
      </Link>
    </div>
  );
  return (
    <Popover
      open={openPopover}
      onOpenChange={onOpenChange}
      overlayInnerStyle={{
        padding: "0",
      }}
      content={content}
      trigger="click"
      placement="bottomLeft"
    >
      <CustomBtn icon={<MenuDots size={13} />} classNames="iconButton" />
    </Popover>
  );
}
