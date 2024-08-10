"use client";

import { useState } from "react";

import CustomSelect from "@/components/shared/form/CustomSelect";
import CustomInp from "@/components/shared/form/CustomInp";
import DetailedBox from "@/components/shared/layout/DetailedBox";
import CustomBtn from "@/components/shared/CustomBtn";
import useServerAction from "@/hooks/useCallServerAction";
import { createAdmin } from "@/actions/auth.action";
import { MESSAGES } from "@/utils/message";

export default function CreateUser() {
  const [form, setForm] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    password: "",
    confirmPassword: "",
    roll: "USER",
  });

  const { loading, res } = useServerAction(createAdmin, form);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      !form.username ||
      !form.firstName ||
      !form.password ||
      !form.confirmPassword
    )
      toast.error(MESSAGES.fillInp);

    if (form.password !== form.confirmPassword)
      toast.error("Confirm password is In-Correct");

    res();
  };
  return (
    <DetailedBox
      title="New User"
      content={
        <form
          className="box w-full h-fit flex flex-col gap-5"
          onSubmit={onSubmit}
        >
          <div className="w-full h-fit flex flex-wrap gap-5">
            <CustomInp
              type="text"
              label="Username *"
              name="username"
              value={form.username}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="text"
              label="First Name *"
              name="firstName"
              value={form.firstName}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="text"
              label="Last Name *"
              name="lastName"
              value={form.lastName}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="email"
              label="Email"
              name="email"
              value={form.email}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="password"
              label="Password *"
              name="password"
              value={form.password}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="password"
              label="Confirm Password *"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="text"
              label="Phone Number"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="text"
              label="Address"
              name="address"
              value={form.address}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomInp
              type="text"
              label="Country"
              name="country"
              value={form.country}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
            <CustomSelect
              name="roll"
              label="Role"
              options={["ADMIN", "USER"]}
              value={form.roll}
              onChange={onChange}
              wrapperClassName="w-full flex flex-1 min-w-[250px] h-fit"
            />
          </div>
          <div className="w-full flex justify-end">
            <CustomBtn
              title="Create"
              type="submit"
              classNames={`w-fit rounded-btn py-2.5 px-5 text-p1 font-medium ${
                loading ? "bg-lightGray" : "bg-dark1 text-white"
              }`}
              isLoading={loading}
            />
          </div>
        </form>
      }
    />
  );
}
