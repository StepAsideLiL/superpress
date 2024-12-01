import "server-only";

import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import {
  UserDataTableRowType,
  UserSettingsKVType,
  UserTableTabCountByRoleType,
} from "@/lib/types";

/**
 * Get user data for table.
 * @returns User data for table.
 */
export async function getUserDataTable(
  role?: string,
  search?: string
): Promise<UserDataTableRowType[]> {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in.");
  }

  // if (role === "" || role === undefined) {
  //   const users = await prisma.users.findMany({
  //     select: {
  //       id: true,
  //       username: true,
  //       email: true,
  //       usermeta: {
  //         where: {
  //           key: "capability",
  //         },
  //         select: {
  //           key: true,
  //           value: true,
  //         },
  //       },
  //     },
  //   });

  //   return users.map((user) => {
  //     return {
  //       id: user.id,
  //       username: user.username,
  //       email: user.email,
  //       role:
  //         user.usermeta.find((item) => item.key === "capability")?.value ||
  //         "user",
  //     };
  //   });
  // }

  const users = await prisma.users.findMany({
    where: {
      displayname: {
        contains: search,
        mode: "insensitive",
      },
      usermeta: {
        some: {
          key: "capability",
          value: role,
        },
      },
    },
    select: {
      id: true,
      username: true,
      email: true,
      usermeta: {
        where: {
          key: "capability",
        },
        select: {
          key: true,
          value: true,
        },
      },
    },
  });

  return users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role:
        user.usermeta.find((item) => item.key === "capability")?.value ||
        "user",
    };
  });
}

/**
 * Get user count by role.
 * @returns Object of user count by role.
 */
export async function getUserCountByRole(): Promise<UserTableTabCountByRoleType> {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in.");
  }

  const users = await prisma.users.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      usermeta: {
        where: {
          key: "capability",
        },
        select: {
          key: true,
          value: true,
        },
      },
    },
  });

  return {
    all: users.length,
    admin: users.filter((user) =>
      user.usermeta.find(
        (item) => item.key === "capability" && item.value === "admin"
      )
    ).length,
    editor: users.filter((user) =>
      user.usermeta.find(
        (item) => item.key === "capability" && item.value === "editor"
      )
    ).length,
    author: users.filter((user) =>
      user.usermeta.find(
        (item) => item.key === "capability" && item.value === "author"
      )
    ).length,
    subscribe: users.filter((user) =>
      user.usermeta.find(
        (item) => item.key === "capability" && item.value === "subscriber"
      )
    ).length,
    user: users.filter((user) =>
      user.usermeta.find(
        (item) =>
          (item.key === "capability" && item.value === "user") || !item.key
      )
    ).length,
  };
}

/**
 * Get user settings meta data.
 * @param settingType Setting type.
 * @returns User metadata type.
 */
export async function getUserSettingsKVType(
  settingType: string = "post"
): Promise<UserSettingsKVType> {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in.");
  }

  const settinsKV = await prisma.usermetas.findMany({
    where: {
      user: {
        id: currentUser.id,
      },
      key: {
        startsWith: `setting.${settingType}.`,
      },
    },
    select: {
      id: true,
      key: true,
      value: true,
    },
  });

  return settinsKV;
}
