import { images } from "@/constant";
import Image from "next/image";
import React from "react";

export default function NotAllowed() {
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
      <p className="text-p1 mb-2 w-[400px] text-center text-xl">
        As a normal user, you do not have access to different levels of the
        site. Please wait to be promoted to admin by the site owner, thank you
        for your patience!
      </p>
    </section>
  );
}
