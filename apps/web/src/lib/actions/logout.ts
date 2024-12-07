"use server";

import auth from "../auth";
import { authSafeActionClient } from "./safe-action";

export const logout = authSafeActionClient.action(async ({ ctx }) => {
  if (!ctx.user) {
    throw new Error("Unauthorized: User not logged in.");
  }

  await auth.deleteUserSession(ctx.session.id);
});
