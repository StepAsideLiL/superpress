"use server";

import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import { addNewPostSchema } from "@/lib/schemas";

const addNewPost = authSafeActionClient
  .schema(addNewPostSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (
      ctx.user.capability !== "admin" &&
      ctx.user.capability !== "editor" &&
      ctx.user.capability !== "author" &&
      ctx.user.capability !== "contributor"
    ) {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { title, slug, postType, postStatus, content } = parsedInput;

    const post = await prisma.posts
      .create({
        data: {
          title: title,
          slug: slug,
          post_type: postType,
          post_status: postStatus,
          author: {
            connect: {
              id: ctx.user.id,
            },
          },
        },
      })
      .then(async (post) => {
        await prisma.postmetas.create({
          data: {
            post: {
              connect: {
                id: post.id,
              },
            },
            id: `${post.id}.content`,
            key: "content",
            value: content,
          },
        });
        return post;
      });

    return post;
  });

export default addNewPost;
