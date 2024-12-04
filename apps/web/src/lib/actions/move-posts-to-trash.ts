"use server";

import { movePostToTrashActionSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

/**
 * Move posts to trash (set post_status as trash in db). Needed capability: admin, editor and post author.
 */
const movePostsToTrash = authSafeActionClient
  .schema(movePostToTrashActionSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (
      ctx.user.capability !== "admin" &&
      ctx.user.capability !== "editor" &&
      ctx.user.capability !== "author"
    ) {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    try {
      if (ctx.user.capability === "author") {
        return await Promise.all(
          parsedInput.map(async (post) => {
            await prisma.posts.update({
              where: {
                id: post.postId,
                author: {
                  id: ctx.user.id,
                },
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
      }

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
