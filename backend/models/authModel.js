import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must include Latin letters")
    .regex(/\d/, "Password must include a digit")
    .regex(/[!?@#$%^&*]/, "Password must include a special character")
    .refine((val) => !["123456", "qwerty"].includes(val), {
      message: "Password is too common",
    }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .transform((email) => email.toLowerCase()),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
