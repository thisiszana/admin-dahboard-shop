"use client";

import { useEffect } from "react";

import { images } from "@/constant";

import { Image } from "@nextui-org/image";
import CustomBtn from "@/components/shared/CustomBtn";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="h-[60vh] w-full flex flex-col justify-center items-center">
      <Image
        src={images.error}
        width={200}
        height={200}
        alt="error!"
        className="w-[150px] mb-5"
      />

      <h1 className="font-black text-5xl mb-4">Oops!</h1>
      <p className="text-p1 mb-2">
        Cannot fetch data at this time! The above error has occured:
      </p>
      <p className="bg-lightRose text-darkRose rounded-lg px-2 py-1 font-bold mb-6">
        {error?.message}
      </p>
      <CustomBtn
        onClick={() => reset()}
        title="Try again"
        classNames="bg-darkBlue rounded-md text-p1 shadow-xl hover:bg-blue-700 Transition shadow-blue-300 px-8 py-2 text-white font-medium"
      />
    </section>
  );
}
