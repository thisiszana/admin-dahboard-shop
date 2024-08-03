import { compare, hash } from "bcryptjs";

export const hashedPassword = async (password) => await hash(password, 12);

export const verifyPassword = async (password, hashedPassword) =>
  compare(password, hashedPassword);
