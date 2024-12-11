import "server-only";

import prisma from "@/lib/prismadb";
import { PostCountByStatus, PostForEditType, PostType } from "@/lib/types";

/**
 * Get posts.
 * @param type Post type.
 * @param status Post status (published, draft, pending, trash).
 * @param author Author username.
 * @param search Search query.
 * @returns Posts.
 */
export async function getPosts(
  type: string = "post",
  status?: string,
  author?: string,
  search?: string
): Promise<PostType[]> {
  if (status === undefined) {
    return await prisma.posts.findMany({
      where: {
        post_type: type,
        post_status: {
          not: "trash",
        },
        author: {
          username: author?.toLowerCase(),
        },
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        post_type: true,
        post_status: true,
        created: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
  }

  if (status === "trash") {
    return await prisma.posts.findMany({
      where: {
        post_type: type,
        post_status: status,
        author: {
          username: author,
        },
        title: {
          contains: search,
          mode: "insensitive",
        },
        postmeta: {
          some: {
            key: "post_status_before_trashing",
          },
        },
      },
      select: {
        id: true,
        title: true,
        slug: true,
        post_type: true,
        post_status: true,
        created: true,
        author: {
          select: {
            id: true,
            username: true,
          },
        },
        postmeta: {
          select: {
            key: true,
            value: true,
          },
        },
      },
    });
  }

  return await prisma.posts.findMany({
    where: {
      post_type: type,
      post_status: status,
      author: {
        username: author,
      },
      title: {
        contains: search,
        mode: "insensitive",
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      post_type: true,
      post_status: true,
      created: true,
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
}

/**
 * Get post counts by status.
 * @param postType Post type.
 * @returns Object containing post counts by status.
 */
export async function getPostsCountByStatus(
  postType: string
): Promise<PostCountByStatus> {
  try {
    const allPostsCount = prisma.posts.count({
      where: {
        post_type: postType,
        post_status: {
          not: "trash",
        },
      },
    });
    const publishedPostsCount = prisma.posts.count({
      where: {
        post_type: postType,
        post_status: "published",
      },
    });
    const pendingPostsCount = prisma.posts.count({
      where: {
        post_type: postType,
        post_status: "pending",
      },
    });
    const draftPostsCount = prisma.posts.count({
      where: {
        post_type: postType,
        post_status: "draft",
      },
    });
    const trashPostsCount = prisma.posts.count({
      where: {
        post_type: postType,
        post_status: "trash",
      },
    });

    return await Promise.all([
      allPostsCount,
      publishedPostsCount,
      pendingPostsCount,
      draftPostsCount,
      trashPostsCount,
    ])
      .then((res) => {
        return {
          all: res[0],
          published: res[1],
          pending: res[2],
          draft: res[3],
          trash: res[4],
        };
      })
      .catch(() => {
        return {
          all: 0,
          published: 0,
          pending: 0,
          draft: 0,
          trash: 0,
        };
      });
  } catch (error) {
    console.error(error);
    return {
      all: 0,
      published: 0,
      pending: 0,
      draft: 0,
      trash: 0,
    };
  }
}

export async function getPostsForEdit(
  postId: string
): Promise<PostForEditType | null> {
  return await prisma.posts.findUnique({
    where: {
      id: postId,
    },
    include: {
      postmeta: true,
    },
  });
}
