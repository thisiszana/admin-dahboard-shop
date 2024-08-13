"use client";

import { updateProfile } from "@/actions/admin.action";
import { LockClosed } from "@/components/icons/Icon";
import CustomBtn from "@/components/shared/CustomBtn";
import CustomInp from "@/components/shared/form/CustomInp";
import RadioList from "@/components/shared/form/RadioList";
import UploadedImage from "@/components/shared/form/UploadedImage";
import { uploadImage } from "@/utils/fun";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfileForm(props) {
  const {
    username,
    firstName,
    gender,
    lastName,
    image,
    email,
    phoneNumber,
    address,
    country,
  } = props.currentAdmin;

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: username || "",
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    phoneNumber: "",
    address: "",
    country: "",
    image: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    setForm({
      username: username || "",
      firstName: firstName || "",
      lastName: lastName || "",
      email: email || "",
      phoneNumber: phoneNumber || "",
      address: address || "",
      country: country || "",
      gender: gender || "",
    });
  }, [
    username,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    country,
    gender,
  ]);
  const queryClient = useQueryClient();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (form.username.length === 0)
      return toast.error("Username cannot be empty!");

    if (
      (form.currentPassword && form.currentPassword.length !== 0) ||
      (form.newPassword && form.newPassword.length !== 0) ||
      (form.confirmNewPassword && form.confirmNewPassword.length !== 0)
    ) {
      if (
        !form.currentPassword ||
        !form.newPassword ||
        !form.confirmNewPassword ||
        form.currentPassword.length === 0 ||
        form.newPassword.length === 0 ||
        form.confirmNewPassword.length === 0
      ) {
        toast.error("Fill other Fields");
        return;
      }
    }

    if (form.newPassword !== form.confirmNewPassword)
      toast.error("Confirm New Password is InCorrect!");

    setLoading(true);

    let newForm = { ...form };

    if (form.image && form.image?.length !== 0) {
      const uploadResult = await uploadImage(form.image[0]);
      newForm = {
        ...form,
        image: uploadResult.imageUrl,
      };
    }

    const result = await updateProfile(newForm);

    setLoading(false);

    if (result.code === 200 || result.code === 201 || result.code === 202) {
      toast.success(result.message);
      queryClient.invalidateQueries("session");
    } else {
      toast.error(result.message);
    }
  };
  return (
    <form className="box w-full h-fit flex flex-col gap-5" onSubmit={onSubmit}>
      <div className="w-full h-fit flex flex-wrap gap-5">
        <CustomInp
          type="text"
          label="Username"
          name="username"
          value={form.username}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="email"
          label="Email"
          name="email"
          value={form.email}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="Country"
          name="country"
          value={form.country}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
        <CustomInp
          type="text"
          label="Address"
          name="address"
          value={form.address}
          onChange={onChange}
          wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
        />
      </div>
      <RadioList form={form} setForm={setForm} />
      <UploadedImage form={form} setForm={setForm} image={image} />
      <div className="flex items-center gap-4">
        <LockClosed wrapperClassName="cardShadow rounded-lg p-3" />
        <p className="text-p1 font-medium">Changing Password</p>
      </div>
      <CustomInp
        type="password"
        label="Current Password"
        name="currentPassword"
        value={form.currentPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <CustomInp
        type="password"
        label="New Password"
        name="newPassword"
        value={form.newPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <CustomInp
        type="password"
        label="Confirm New Password"
        name="confirmNewPassword"
        value={form.confirmNewPassword}
        onChange={onChange}
        wrapperClassName="w-full flex flex-1 min-w-[280px] h-fit"
      />
      <div className="w-full flex justify-end">
        <CustomBtn
          title="Save Changes"
          type="submit"
          classNames={`w-fit rounded-btn py-2.5 px-5 text-p1 font-medium ${
            loading ? "bg-lightGray" : "bg-dark1 text-white"
          }`}
          isLoading={loading}
        />
      </div>
    </form>
  );
}
