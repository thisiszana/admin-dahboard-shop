import { compare, hash } from "bcryptjs";

export const hashedPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashedPassword) =>
  compare(password, hashedPassword);
export const uploadImage = async (path) => {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.NEXT_PUBLIC_UPLOAD_PRESET;

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
  const formData = new FormData();

  formData.append("file", path);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return { imageUrl: data.secure_url };
  } catch (error) {
    return {
      imageUrl: null,
    };
  }
};
