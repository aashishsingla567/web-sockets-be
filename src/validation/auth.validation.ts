import { z } from "zod";

import { emailSchema, passwordSchema, nameSchema } from "./user.validation";

// login
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// register
export const registerSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
