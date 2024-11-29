"use server";

import { screenOptionFormSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

export const updateScreenOptions = authSafeActionClient
  .schema(screenOptionFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    await Promise.all([
      parsedInput.map(async (item) => {
        await prisma.usermetas.update({
          where: {
            id: item.id,
            user: {
              id: ctx.user.id,
            },
          },
          data: {
            value: item.value,
          },
        });
      }),
    ]);
  });
