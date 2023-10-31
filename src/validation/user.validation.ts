import { z } from "zod";
import ApiError from "../utils/ApiError";

export const emailSchema = z.string().email().min(3).max(50);
export const passwordSchema = z.string().min(6).max(20);
export const nameSchema = z.string().min(3).max(20).min(1);
export const phoneSchema = z.string().min(10).max(10);

export const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
export const mongoIdSchema = z
  .string()
  .refine((value) => mongoIdRegex.test(value), {
    message: "Invalid ObjectId format",
  });

export const userSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const updateUserSchema = z.object({
  name: nameSchema.optional().nullable(),
  email: emailSchema.optional().nullable(),
  password: passwordSchema.optional().nullable(),
});

// delete user
export const deleteUserSchema = z.object({
  user_id: mongoIdSchema,
});
