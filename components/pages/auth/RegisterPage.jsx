"use client";

import { useState } from "react";

import Image from "next/image";

import CustomInp from "@/components/shared/form/CustomInp";
import { images } from "@/constant";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useCallServerAction";
import { createAdmin } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@/utils/message";
import toast from "react-hot-toast";
import UploadedImage from "@/components/shared/form/UploadedImage";
import RadioList from "@/components/shared/form/RadioList";
import Link from "next/link";

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    image: "",
    gender: "",
  });

  const router = useRouter();

  const { loading, res } = useServerAction(createAdmin, form, () =>
    router.push("/login")
  );

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.firstName || !form.username || !form.password)
      return toast.error(MESSAGES.fillInp);

    res();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[150px] bg-white max-xl:p-[30px]"
    >
      <div className="max-xl:hidden bg-gray-100 h-screen w-1/2 flex items-center justify-center">
        <Image
          src={images.authRegister}
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
            <div className="flex gap-4">
              <CustomInp
                name="firstName"
                type="text"
                label="First Name"
                value={form.firstName}
                onChange={changeHandler}
              />
              <CustomInp
                name="lastName"
                type="text"
                label="Last Name"
                value={form.lastName}
                onChange={changeHandler}
              />
            </div>
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
            <RadioList form={form} setForm={setForm} />
            <UploadedImage form={form} setForm={setForm} />
            <CustomBtn
              type="submit"
              title={"Register"}
              isLoading={loading}
              disabled={loading}
              classNames={`${
                loading ? "bg-gray-100 text-black" : "bg-black text-white"
              } w-full h-[50px] font-bold flex items-center justify-center rounded-btn`}
            />
            <div className="flex items-center justify-center gap-4 text-sm font-bold">
              <p>Already have account?</p>
              <Link
                href="/login"
                className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
