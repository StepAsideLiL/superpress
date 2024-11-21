"use server";

import auth from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { faker } from "@faker-js/faker";
import { redirect } from "next/navigation";
import slug from "slug";

export async function generateFakePosts(
  postType: string = "post",
  postStatus: string = "published"
) {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    redirect("/");
  }

  return await Promise.all(
    Array.from({ length: 10 }, async () => {
      const title = faker.lorem.sentence({ min: 5, max: 10 });
      await prisma.posts.create({
        data: {
          post_type: postType,
          title: title,
          slug: slug(title),
          post_status: postStatus,
          author: {
            connect: {
              id: currentUser.id,
            },
          },
        },
      });
    })
  )
    .then(() => {
      return {
        success: true,
        status: "success",
        message: "Posts generated successfully.",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        status: "error",
        message: "Error generating posts.",
      };
    });
}
