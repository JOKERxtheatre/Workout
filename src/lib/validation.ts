import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(
    (data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"]
    }
  );

  export const taskSchema = z.object({
    title: z.string().min(3),
  });