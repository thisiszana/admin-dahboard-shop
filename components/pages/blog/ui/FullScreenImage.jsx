"use client";

import { useState } from "react";

import { Close, EyeOpen } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import { Tooltip } from "antd";
import Image from "next/image";

export default function FullScreenImage({ image, title }) {
  const [fullScreen, setFullScreen] = useState(false);

  return (
    <div>
      <div className="w-full flex justify-end absolute bottom-5 right-5">
        <Tooltip title="Full Screen Image" placement="bottom">
          <CustomBtn
            icon={<EyeOpen />}
            classNames="w-fit text-white p-3 bg-white/20 rounded-full"
            onClick={() => setFullScreen(true)}
          />
        </Tooltip>
      </div>
      {fullScreen && (
        <div
          className="w-full h-screen fixed z-40 inset-0 bg-black/70 p-8 space-y-5 cursor-pointer"
          onClick={() => setFullScreen(false)}
        >
          <div className="w-full flex justify-end">
            <CustomBtn
              icon={<Close size={25} />}
              onClick={() => setFullScreen(false)}
              classNames="text-white bg-white/30 hover:bg-white/40 Transition p-3 rounded-full"
            />
          </div>
          <div className="flex items-center justify-center">
            <Image
              src={image}
              width={1920}
              height={400}
              alt={title}
              className="w-[600px]"
              radius="none"
            />
          </div>
        </div>
      )}
    </div>
  );
}
