import { z } from "zod";

export const baseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must include Latin letters")
    .regex(/\d/, "Password must include a digit")
    .regex(/[!?@#$%^&*]/, "Password must include a special character")
    .regex(
      /^[A-Za-z0-9!?@#$%^&*]+$/,
      "Password must only contain Latin letters, numbers, and special characters"
    ),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});
