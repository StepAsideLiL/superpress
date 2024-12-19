"use server";

import { authSafeActionClient } from "./safe-action";
import { z } from "zod";
import prisma from "@/lib/prismadb";

const schema = z.string();

const addNewPost = authSafeActionClient
  .schema(schema)
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

    const post = await prisma.posts
      .create({
        data: {
          title: "",
          slug: "",
          post_type: parsedInput,
          post_status: "draft",
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
            value: "[]",
          },
        });
        return post;
      });

    return post;
  });

export default addNewPost;
