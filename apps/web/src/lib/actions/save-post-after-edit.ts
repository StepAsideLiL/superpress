"use server";

import { savePostAfterEditSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

/**
 * Save the post after editing. Needed capability: admin, editor, post author, post contributor.
 */
const savePostAfterEdit = authSafeActionClient
  .schema(savePostAfterEditSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: Not logged in");
    }

    if (
      ctx.user.capability !== "admin" &&
      ctx.user.capability !== "editor" &&
      ctx.user.capability !== "author" &&
      ctx.user.capability !== "contributor"
    ) {
      throw new Error("Unauthorized: Not allowed");
    }

    const { post, postId, content } = parsedInput;

    await prisma.postmetas.update({
      where: {
        id: `${postId}.content`,
      },
      data: {
        value: content,
        post: {
          update: {
            title: post.title,
            slug: post.slug,
            post_status: post.postStatus,
          },
        },
      },
    });
  });

export default savePostAfterEdit;
