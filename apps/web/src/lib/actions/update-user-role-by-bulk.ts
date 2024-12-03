"use server";

import { updateUserRoleByBulkSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

const updateUserRoleByBulk = authSafeActionClient
  .schema(updateUserRoleByBulkSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    await Promise.all(
      parsedInput.map(async (user) => {
        await prisma.usermetas
          .upsert({
            where: {
              id: user.roleId,
            },
            update: {
              value: user.role,
            },
            create: {
              key: "capability",
              value: user.role,
              user: {
                connect: {
                  id: user.userId,
                },
              },
            },
          })
          .catch(() => {
            console.log("oops");
          });
      })
    );
  });

export default updateUserRoleByBulk;
