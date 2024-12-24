"use server";

import { updateUserProfileSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

const updateUserProfile = authSafeActionClient
  .schema(updateUserProfileSchema)
  .action(async ({ parsedInput, ctx }) => {
    const { firstName, lastName } = parsedInput;

    await prisma.usermetas.upsert({
      where: {
        id: `${ctx.user.id}.first_name`,
      },
      update: {
        value: firstName,
      },
      create: {
        id: `${ctx.user.id}.first_name`,
        key: "first_name",
        value: firstName,
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });

    await prisma.usermetas.upsert({
      where: {
        id: `${ctx.user.id}.last_name`,
      },
      update: {
        value: lastName,
      },
      create: {
        id: `${ctx.user.id}.last_name`,
        key: "last_name",
        value: lastName,
        user: {
          connect: {
            id: ctx.user.id,
          },
        },
      },
    });
  });

export default updateUserProfile;
