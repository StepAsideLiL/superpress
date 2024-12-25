"use server";

import { createNewUserSchema } from "@/lib/schemas";
import { authSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import { returnValidationErrors } from "next-safe-action";
import { log } from "console";
import { Prisma } from "@prisma/client";

/**
 * Add new user to the database. Needed capability: admin.
 */
const addNewUser = authSafeActionClient
  .schema(createNewUserSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (ctx.user.capability !== "admin") {
      throw new Error("Unauthorized: User does not have the capability.");
    }

    const { username, email, password, firstName, lastName, role } =
      parsedInput;

    const user = await prisma.users
      .create({
        data: {
          username: username.toLowerCase(),
          displayname: username,
          email,
          password: await auth.hashPassword(password),
        },
      })
      .catch((error) => {
        log(JSON.stringify(error, null, 2));
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === "P2002"
        ) {
          if ((error.meta?.target as string[]).includes("username")) {
            returnValidationErrors(createNewUserSchema, {
              username: {
                _errors: ["Username is taken."],
              },
            });
          }
          if ((error.meta?.target as string[]).includes("email")) {
            returnValidationErrors(createNewUserSchema, {
              email: {
                _errors: ["Email already exists."],
              },
            });
          }
        }
      });

    if (!user) {
      return;
    }

    await prisma.usermetas.createMany({
      data: [
        {
          id: `${user.id}.first_name`,
          key: "first_name",
          value: firstName,
          user_id: user.id,
        },
        {
          id: `${user.id}.last_name`,
          key: "last_name",
          value: lastName,
          user_id: user.id,
        },
        {
          id: `${user.id}.capability`,
          key: "capability",
          value: role,
          user_id: user.id,
        },
      ],
    });
  });

export default addNewUser;
