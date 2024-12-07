import auth from "@/lib/auth";
import prisma from "@/lib/prismadb";
import { createSafeActionClient } from "next-safe-action";

export const safeActionClient = createSafeActionClient({
  handleServerError(error) {
    console.log(error);

    if (error instanceof Error) {
      return error.message;
    }

    return "An unknown error occurred.";
  },
});

export const authSafeActionClient = safeActionClient.use(async ({ next }) => {
  const currentUser = await auth.getCurrentSessionAndUser();

  if (!currentUser.user?.id) {
    throw new Error("Unauthorized: User not logged in.");
  }

  return next({
    ctx: {
      user: {
        id: currentUser.user.id,
        username: currentUser.user.username,
        displayname: currentUser.user.displayname,
        email: currentUser.user.email,
        capability: currentUser.user.usermeta[0].value || "user",
      },
      session: currentUser.session,
    },
  });
});

export const adminSafeActionClient = safeActionClient.use(async ({ next }) => {
  const admins = await prisma.users.findMany({
    where: {
      usermeta: {
        every: {
          key: "capability",
          value: "admin",
        },
      },
    },
  });

  if (admins.length !== 0) {
    // throw new Error("Unauthorized: admin exists.");
    return next({
      ctx: {
        adminExists: false,
      },
    });
  }

  return next({
    ctx: {
      adminExists: true,
    },
  });
});
