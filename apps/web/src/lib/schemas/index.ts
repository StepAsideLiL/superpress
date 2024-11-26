import { z } from "zod";

export const registerAndSetupAdminFromSchema = z
  .object({
    username: z
      .string()
      .regex(/^[a-zA-Z0-9 _\-@.]+$/)
      .min(1, {
        message: "Username is required.",
      }),
    email: z.string().min(1, {
      message: "Email is required.",
    }),
    password: z.string().min(1, {
      message: "Password is required.",
    }),
    confirmPassword: z.string().min(1, {
      message: "Confirm password is required.",
    }),
    siteName: z.string().min(1, {
      message: "Site name is required.",
    }),
    siteDescription: z.string().min(1, {
      message: "Site description is required.",
    }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export const quickEditFormSchema = z.object({
  title: z.string().min(1, {
    message: "Title is required",
  }),
  slug: z.string().min(1, { message: "Slug is required" }),
  status: z.string(),
  date: z.date(),
});
