"use server";

import prisma from "@/lib/prismadb";

export async function movePostToTrash(posts: { id: bigint; status: string }[]) {
  return await Promise.all(
    posts.map(async (post) => {
      await prisma.posts.update({
        where: {
          id: post.id,
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
  )
    .then(() => {
      return {
        success: true,
        status: "success",
        message: "Moved to trash successfully.",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        status: "error",
        message: "Failed to move to trash.",
      };
    });
}

export async function updateQuickEditInfo(values: {
  id: bigint;
  title: string;
  slug: string;
  status: string;
  date: Date;
}) {
  const post = await prisma.posts.update({
    where: {
      id: values.id,
    },
    data: {
      title: values.title,
      slug: values.slug,
      post_status: values.status,
      created: values.date,
    },
  });

  if (post) {
    return {
      success: true,
      status: "success",
      message: "Post updated successfully.",
    };
  } else {
    return {
      success: false,
      status: "error",
      message: "Failed to update post.",
    };
  }
}

export async function updatePostInBulk(postIds: bigint[], postStatus: string) {
  const posts = await prisma.posts.updateMany({
    where: {
      id: {
        in: postIds,
      },
    },
    data: {
      post_status: postStatus,
    },
  });

  if (posts) {
    return {
      success: true,
      status: "success",
      message: "Posts updated successfully.",
    };
  } else {
    return {
      success: false,
      status: "error",
      message: "Failed to update posts.",
    };
  }
}

export async function deletePosts(postIds: bigint[]) {
  return await prisma.posts
    .deleteMany({
      where: {
        id: {
          in: postIds,
        },
      },
    })
    .then(() => {
      return {
        success: true,
        status: "success",
        message: "Deleted successfully.",
      };
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        status: "error",
        message: "Failed to delete",
      };
    });
}

export async function restorePosts(
  posts: { id: bigint; statusBeforeTrashing: string }[]
) {
  return await Promise.all(
    posts.map(async (post) => {
      await prisma.posts.update({
        where: { id: post.id },
        data: {
          post_status: post.statusBeforeTrashing,
        },
      });
    })
  )
    .then(async () => {
      return await prisma.postmetas
        .deleteMany({
          where: {
            key: "post_status_before_trashing",
          },
        })
        .then(() => {
          return {
            success: true,
            status: "success",
            message: "Restored successfully.",
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            success: false,
            status: "error",
            message:
              "Failed to remove post_status_before_trashing post metadata key.",
          };
        });
    })
    .catch((error) => {
      console.log(error);
      return {
        success: false,
        status: "error",
        message: "Failed to restore.",
      };
    });
}
