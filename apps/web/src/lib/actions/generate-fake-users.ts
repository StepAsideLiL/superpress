"use server";

import { faker } from "@faker-js/faker";
import { generateFakeUserFormSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";

/**
 * Generate fake users. Needed capability: admin.
 */
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
          const firstName = faker.person.firstName();
          const lastName = faker.person.firstName();
          const username = faker.internet.username({ firstName, lastName });
          const email = faker.internet.email({ firstName, lastName });
          const password = await auth.hashPassword("m");
          await prisma.users.create({
            data: {
              username: username.toLowerCase(),
              displayname: username,
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
