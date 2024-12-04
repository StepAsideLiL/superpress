"use server";

import { generateFakePostsFormSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import slug from "slug";
import { faker } from "@faker-js/faker";

/**
 * Generate fake posts. Needed capability: admin.
 */
const generateFakePosts = authSafeActionClient
  .schema(generateFakePostsFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { postCount, status, type } = parsedInput;

    try {
      return await Promise.all([
        Array.from({ length: Number(postCount) }, async () => {
          const title = faker.lorem.sentence({ min: 3, max: 10 });
          await prisma.posts.create({
            data: {
              post_type: type,
              title: title,
              slug: slug(title),
              post_status: status,
              author: {
                connect: {
                  id: ctx.user.id,
                },
              },
            },
          });
        }),
      ]);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate fake posts.");
    }
  });

export default generateFakePosts;
