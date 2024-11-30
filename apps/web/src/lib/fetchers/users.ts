import "server-only";

import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import { UserSettingsKVType } from "@/lib/types";

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
