"use server";

import auth from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { loginFormSchema } from "@/lib/schemas";
import { safeActionClient } from "./safe-action";

export const login = safeActionClient
  .schema(loginFormSchema)
  .action(async ({ parsedInput }) => {
    const { usernameOrEmail, password } = parsedInput;

    const user = await prisma.users.findFirst({
      where: {
        OR: [
          {
            username: usernameOrEmail.toLowerCase(),
          },
          {
            email: usernameOrEmail,
          },
        ],
      },
    });

    if (!user) {
      throw new Error("Invalid username or email.");
    }

    if (!(await auth.verifyPassword(password, user.password))) {
      throw new Error("Invalid password.");
    }

    await auth.setNewUserSession(user.id);
  });
