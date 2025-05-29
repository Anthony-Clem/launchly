import { z } from "zod";

export const registerUserSchema = z
  .object({
    name: z.string().min(1, "Name required").max(255, "Name cannot be greater than 255 characters"),
    email: z
      .string()
      .email("Invalid email")
      .transform((val) => val.toLowerCase()),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(255, "Password cannot be greater than 255 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email")
    .transform((val) => val.toLowerCase()),
  password: z.string().min(1, "Password required"),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

export type registerUserSchemaType = z.infer<typeof registerUserSchema>;
export type loginUserSchemaType = z.infer<typeof loginUserSchema>;
