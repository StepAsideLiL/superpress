"use server";

import { faker } from "@faker-js/faker";
import { generateFakeUserFormSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";

const generateFakeUsers = authSafeActionClient
  .schema(generateFakeUserFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.user) {
      throw new Error("Unauthorized: User not logged in.");
    }

    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { userCount, userRole } = parsedInput;

    try {
      return await Promise.all(
        Array.from({ length: Number(userCount) }, async () => {
          const username = faker.internet.username();
          const email = faker.internet.email();
          const password = "m";
          await prisma.users.create({
            data: {
              username,
              email,
              password,
              usermeta: {
                create: {
                  key: "capability",
                  value: userRole,
                },
              },
            },
          });
        })
      );
    } catch (error) {
      console.error(error);
      throw new Error("Failed to generate users.");
    }
  });

export default generateFakeUsers;
