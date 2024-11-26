"use server";

import { z } from "zod";
import { authSafeActionClient } from "./safe-action";
import { bulkEditFormSchema } from "@/lib/schemas";
import prisma from "@/lib/prismadb";

const schema = bulkEditFormSchema.extend({
  postIds: z.array(z.string()),
});

/**
 * Update post info from bulk edit form. The capabilities needed for this actions are: admin.
 */
const updatePostInfoByBulkEdit = authSafeActionClient
  .schema(schema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { postIds, status } = parsedInput;

    try {
      await prisma.posts.updateMany({
        where: {
          id: {
            in: postIds,
          },
        },
        data: {
          post_status: status,
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to update post.");
    }
  });

export default updatePostInfoByBulkEdit;
