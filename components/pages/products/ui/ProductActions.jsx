"use client";

import { MenuDots } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import { Popover } from "antd";
import { useState } from "react";

export default function ProductActions({ productId, published }) {
  const [open, setOpen] = useState(false);

//   const content = 
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
