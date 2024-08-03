"use client";

import { useState } from "react";

import Image from "next/image";

import CustomInp from "@/components/shared/form/CustomInp";
import CustomBtn from "@/components/shared/CustomBtn";
import { images } from "@/constant";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const changeHandler = () => {};
  const handleSubmit = (e) => {};
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[150px] bg-white"
    >
      <div className="max-xl:hidden bg-gray-100 h-screen w-1/2 flex items-center justify-center">
        <Image
          src={images.authLogin}
          width={450}
          height={450}
          alt="auth-login"
        />
      </div>
      <div className="max-xl:flex max-xl:justify-center max-xl:mt-16 max-xl:w-full">
        <div className="sm:w-[400px]">
          <div className="mb-[20px]">
            <h1 className="font-medium text-gray-600 text-[30px] mb-[5px]">
              Buy cheap with Sorme!
            </h1>
            <p className="text-gray-500 text-[13px] tracking-tight mb-[25px]">
              Welcome to Sorme! Experience a safe and enjoyable purchase. Thank
              you for choosing us.
            </p>
          </div>
          <div className="space-y-5">
            <CustomInp
              name="username"
              type="text"
              label="Username"
              value={form.username}
              onChange={changeHandler}
            />
            <CustomInp
              name="password"
              type="password"
              label="Password"
              value={form.password}
              onChange={changeHandler}
            />
            <CustomBtn
              type="submit"
              title={"Login"}
              isLoading={loading}
              disabled={loading}
              classNames={`${
                loading ? "bg-gray-100 text-black" : "bg-black text-white"
              } w-full h-[50px] font-bold flex items-center justify-center rounded-btn`}
            />
          </div>
        </div>
      </div>
    </form>
  );
}
