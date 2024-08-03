import { hash } from "bcryptjs";

export const hashedPassword = async (password) => await hash(password, 12);
