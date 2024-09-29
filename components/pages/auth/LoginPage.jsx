"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

import toast from "react-hot-toast";

import CustomInp from "@/components/shared/form/CustomInp";
import useServerAction from "@/hooks/useCallServerAction";
import CustomBtn from "@/components/shared/CustomBtn";
import { loginAdmin } from "@/actions/auth.action";
import { images } from "@/constant";
import Link from "next/link";
import { Alert } from "antd";

export default function LoginPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const { loading, res } = useServerAction(loginAdmin, form, () =>
    router.push("/dashboard")
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.password || !form.username) return toast.error(MESSAGES.fillInp);

    res();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-[150px] bg-white max-xl:p-[30px]"
    >
      <div className="max-xl:hidden bg-gray-100 rounded-3xl h-screen w-1/2 flex items-center justify-center">
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
            <div className="flex flex-col items-center gap-4 text-sm font-bold">
              <div className="flex items-center justify-center gap-4">
                <p>Dont have account?</p>
                <Link
                  href="/register"
                  className="bg-gray-100 border text-center py-1 px-4 rounded-lg"
                >
                  Register
                </Link>
              </div>
            </div>
            <Alert
              description={
                <div className="space-y-2">
                  <p>
                    Owner usernmae : <span className="font-bold">Zana80</span> /
                    password : <span className="font-bold">zana12345</span>
                  </p>
                </div>
              }
              type="info"
              showIcon
            />
          </div>
        </div>
      </div>
    </form>
  );
}
