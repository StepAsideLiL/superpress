"use server";

import { movePostToTrashActionSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

/**
 * Move posts to trash (set post_status as trash in db).
 */
const movePostsToTrash = authSafeActionClient
  .schema(movePostToTrashActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    try {
      return await Promise.all(
        parsedInput.map(async (post) => {
          await prisma.posts.update({
            where: {
              id: post.postId,
            },
            data: {
              post_status: "trash",
              postmeta: {
                create: {
                  key: "post_status_before_trashing",
                  value: post.status,
                },
              },
            },
          });
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to move post to trash.");
    }
  });

export default movePostsToTrash;
