"use client";

import NextImage from "next/image";

import { images } from "@/constant";

import { Image } from "@nextui-org/react";
import { Home } from "@/components/icons/Icon";
import Navbar from "@/components/shared/layout/Navbar";
import Sidebar from "@/components/shared/layout/Sidebar";
import BackLink from "@/components/shared/BackLink";

const NotFound = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <div className="pages_spaces">
        <div className="flex flex-col items-center">
          <Image
            as={NextImage}
            src={images.notFound}
            width={300}
            height={300}
            alt="Not Found!"
          />
          <p className="mt-5 mb-2 text-darkRose text-p1">Route Not Found!</p>
          <BackLink
            title="Back to Home"
            icon={<Home size={15} />}
            href="/dashboard"
            classNames="bg-lightGray hover:bg-gray-200 Transition flex items-center gap-3 rounded-xl py-2 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFound;
