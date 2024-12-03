"use server";

import { deleteUsersSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

export const deteteUsers = authSafeActionClient
  .schema(deleteUsersSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const users = parsedInput.filter((id) => id !== ctx.user.id);

    try {
      await prisma.users.deleteMany({
        where: {
          id: {
            in: users,
          },
        },
      });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to delete users.");
    }
  });
