"use server";

import { deletePostsActionSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

/**
 * Delete posts form db. Needed capability: admin, editor, and post author.
 */
const deletePosts = authSafeActionClient
  .schema(deletePostsActionSchema)
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
        return await Promise.all([
          parsedInput.map(async (postId) => {
            await prisma.posts.deleteMany({
              where: {
                id: postId,
                author: {
                  id: ctx.user.id,
                },
              },
            });
          }),
        ]);
      }

      return await Promise.all([
        parsedInput.map(async (postId) => {
          await prisma.posts.deleteMany({
            where: {
              id: postId,
            },
          });
        }),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete posts.");
    }
  });

export default deletePosts;
