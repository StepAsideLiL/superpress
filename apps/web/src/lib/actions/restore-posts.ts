"use server";

import { restorePostsActionSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

/**
 * Restore posts from trash. Needed capability: admin, editor, and post author.
 */
const restorePosts = authSafeActionClient
  .schema(restorePostsActionSchema)
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
                post_status: post.statusBeforeTrashing,
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
              post_status: post.statusBeforeTrashing,
            },
          });
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to restore posts.");
    }
  });

export default restorePosts;
