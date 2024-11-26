"use server";

import { z } from "zod";
import { authSafeActionClient } from "./safe-action";
import { quickEditFormSchema } from "@/lib/schemas";
import prisma from "@/lib/prismadb";

const schema = quickEditFormSchema.extend({
  postId: z.string(),
});

/**
 * Update post info from quick edit form. The capabilities needed for this actions are: admin, editor,
 */
const updatePostInfoByQuickEdit = authSafeActionClient
  .schema(schema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin" && ctx.user.capability !== "editor") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { postId, title, slug, status, date } = parsedInput;

    try {
      await prisma.posts.update({
        where: {
          id: postId,
        },
        data: {
          title: title,
          slug: slug,
          post_status: status,
          created: date,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update post.");
    }
  });

export default updatePostInfoByQuickEdit;
