import "server-only";

import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import {
  UserDataTableRowType,
  UpdateUserProfileType,
  UserSettingsKVType,
  UserTableTabCountByRoleType,
  UserProfileForEditByAdminType,
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
          id: true,
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
      roleId:
        user.usermeta.find((item) => item.key === "capability")?.id ||
        `${user.id}.capability`,
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

/**
 * Get current user profile.
 * @returns User info.
 */
export async function getCurrentUserProfile(): Promise<UpdateUserProfileType | null> {
  const currentUser = await auth.getCurrentUser();

  if (!currentUser) {
    throw new Error("Not logged in.");
  }

  const user = await prisma.users.findUnique({
    where: {
      id: currentUser.id,
    },
    select: {
      displayname: true,
      email: true,
    },
  });

  const usermeta = await prisma.usermetas.findMany({
    where: {
      OR: [
        {
          id: `${currentUser.id}.first_name`,
        },
        {
          id: `${currentUser.id}.last_name`,
        },
      ],
    },
  });

  if (!user || !usermeta) {
    return null;
  }

  return {
    username: user.displayname,
    email: user.email,
    firstName:
      usermeta.find((item) => item.id.endsWith("first_name"))?.value || "",
    lastName:
      usermeta.find((item) => item.id.endsWith("last_name"))?.value || "",
  };
}

/**
 * Get user profile for edit by admin.
 * @param userId User id for edit.
 * @returns User info
 */
export async function getUserProfileForEditByAdmin(
  userId: string
): Promise<UserProfileForEditByAdminType | null> {
  const user = await prisma.users.findUnique({
    where: {
      id: userId,
    },
  });

  const usermeta = await prisma.usermetas.findMany({
    where: {
      user_id: userId,
    },
  });

  if (!user || !usermeta) {
    return null;
  }

  return {
    userId: user.id,
    username: user.displayname,
    email: user.email,
    firstName:
      usermeta.find((item) => item.id.endsWith("first_name"))?.value || "",
    lastName:
      usermeta.find((item) => item.id.endsWith("last_name"))?.value || "",
    role:
      usermeta.find((item) => item.id.endsWith("capability"))?.value || "user",
  };
}
