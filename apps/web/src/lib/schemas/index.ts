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

export const bulkEditFormSchema = z.object({
  status: z.string(),
});

export const movePostToTrashActionSchema = z.array(
  z.object({
    postId: z.string(),
    status: z.string(),
  })
);

export const restorePostsActionSchema = z.array(
  z.object({
    postId: z.string(),
    statusBeforeTrashing: z.string(),
  })
);

export const deletePostsActionSchema = z.array(z.string());

export const generateFakePostsFormSchema = z.object({
  postCount: z.string(),
  type: z.enum(["post", "page"]),
  status: z.enum(["published", "draft", "pending", "trash"]),
});

export const generateFakeUserFormSchema = z.object({
  userCount: z.string(),
  userRole: z.enum(["admin", "editor", "author", "subscriber", "user"]),
});

export const screenOptionFormSchema = z.array(
  z.object({
    id: z.string(),
    value: z.string(),
  })
);

export const deleteUsersSchema = z.array(z.string());

export const updateUserRoleByBulkSchema = z.array(
  z.object({
    userId: z.string(),
    roleId: z.string(),
    role: z.string(),
  })
);

export const loginFormSchema = z.object({
  usernameOrEmail: z.string(),
  password: z.string(),
});
