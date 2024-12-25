"use server";

import prisma from "@/lib/prismadb";
import { editUserProfileByAdminSchema } from "../schemas";
import { authSafeActionClient } from "./safe-action";

/**
 * Update user profile by admin. Needed capability: admin.
 */
const updateUserProfileByAdmin = authSafeActionClient
  .schema(editUserProfileByAdminSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { userId, firstName, lastName, role } = parsedInput;

    await Promise.all([
      await prisma.usermetas.upsert({
        where: {
          id: `${userId}.first_name`,
        },
        update: {
          value: firstName,
        },
        create: {
          id: `${userId}.first_name`,
          key: "first_name",
          value: firstName,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      }),

      await prisma.usermetas.upsert({
        where: {
          id: `${userId}.last_name`,
        },
        update: {
          value: lastName,
        },
        create: {
          id: `${userId}.last_name`,
          key: "last_name",
          value: lastName,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      }),

      await prisma.usermetas.upsert({
        where: {
          id: `${userId}.capability`,
        },
        update: {
          value: role,
        },
        create: {
          id: `${userId}.capability`,
          key: "capability",
          value: role,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      }),
    ]);
  });

export default updateUserProfileByAdmin;
