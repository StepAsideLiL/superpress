import "server-only";

import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { hash, verify, Options } from "@node-rs/argon2";
import type { sessions as Sessions } from "@prisma/client";
import prisma from "@/lib/prismadb";
import { cookies } from "next/headers";
import { cache } from "react";

type SessionValidationResult =
  | {
      session: Sessions;
      user: {
        id: bigint;
        username: string;
        email: string;
        usermeta: {
          id: bigint;
          key: string;
          value: string;
        }[];
      };
    }
  | { session: null; user: null };

/**
 * Generate a random token for the session id.
 * @returns Token for the session id.
 */
function generateSessionToken(): string {
  const bytes = new Uint8Array(20);
  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);
  return token;
}

/**
 * Creates a new session and store in the db for the user.
 * @param token Token for the session id from generateSessionToken() function.
 * @param userId Id of the user.
 * @returns Session object.
 */
async function createSession(token: string, userId: bigint): Promise<Sessions> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const session: Sessions = {
    id: sessionId,
    user_id: userId,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
  };
  await prisma.sessions.create({
    data: session,
  });
  return session;
}

/**
 * Validates the session token and extands the expiration date.
 * @param token Token for the session id stored in the cookie.
 * @returns Session object and user object.
 */
async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const result = await prisma.sessions.findUnique({
    where: {
      id: sessionId,
    },
    select: {
      id: true,
      user_id: true,
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          usermeta: {
            where: {
              key: "capability",
            },
            select: {
              id: true,
              key: true,
              value: true,
            },
          },
        },
      },
      expiresAt: true,
    },
  });
  if (result === null) {
    return { session: null, user: null };
  }
  const { user, ...session } = result;
  if (Date.now() >= session.expiresAt.getTime()) {
    await prisma.sessions.delete({ where: { id: sessionId } });
    return { session: null, user: null };
  }
  if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await prisma.sessions.update({
      where: {
        id: session.id,
      },
      data: {
        expiresAt: session.expiresAt,
      },
    });
  }
  return { session, user };
}

/**
 * Invalidate (delete from the db) the session for the given session id.
 * @param sessionId Id of the session to be invalidated.
 */
async function invalidateSession(sessionId: string) {
  await prisma.sessions.delete({ where: { id: sessionId } });
}

/**
 * Set the session token cookie for the user.
 * @param token Token for the session id from generateSessionToken() function.
 * @param expiresAt Expiration date for the session from createSession(token, userId) function.
 */
function setSessionTokenCookie(token: string, expiresAt: Date) {
  const cookieStore = cookies();
  cookieStore.set("sp-session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

/**
 * Delete the session token cookie.
 */
function deleteSessionTokenCookie() {
  const cookieStore = cookies();
  cookieStore.set("sp-session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

/**
 * Get the current session and user from the cookie.
 * @returns Session object and user object.
 */
const getCurrentSessionAndUser = cache(
  async (): Promise<SessionValidationResult> => {
    const cookieStore = cookies();
    const token = cookieStore.get("sp-session")?.value ?? null;
    if (token === null) {
      return { session: null, user: null };
    }
    const result = await validateSessionToken(token);
    return result;
  }
);

/**
 * Get the current user data.
 */
const getCurrentUser = cache(
  async (): Promise<{
    id: bigint;
    username: string;
    email: string;
    capability: string;
  } | null> => {
    const { user } = await getCurrentSessionAndUser();
    if (user === null) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      capability: user.usermeta[0].value || "subscriber",
    };
  }
);

/**
 * Check if the user is logged in.
 */
const isUserLoggedIn = cache(async () => {
  const user = await getCurrentUser();

  if (user) {
    return true;
  }
  return false;
});

/**
 * Set a new session in the cookie and db for the user.
 * @param userId Id of the user.
 */
async function setNewUserSession(userId: bigint) {
  const token = generateSessionToken();
  const session = await createSession(token, userId);
  setSessionTokenCookie(token, session.expiresAt);
}

/**
 * Delete the session from the cookie and db.
 * @param sessionId Id of the session.
 */
async function deleteUserSession(sessionId: string) {
  await invalidateSession(sessionId);
  deleteSessionTokenCookie();
}

const options: Options = {
  algorithm: 2,
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
  version: 1,
};

/**
 * Hash a password using Argon2id algorithm.
 * @param password Password to be hashed.
 * @returns Hashed password.
 */
async function hashPassword(password: string) {
  return await hash(password.normalize("NFKD"), { ...options });
}

/**
 * Verify a password using Argon2id algorithm.
 * @param password Password to be verified.
 * @param hash Hash from the database.
 * @returns True if the password matches the hash, false otherwise.
 */
async function verifyPassword(password: string, hash: string) {
  return await verify(hash, password.normalize("NFKD"), { ...options });
}

const auth = {
  getCurrentSessionAndUser,
  getCurrentUser,
  isUserLoggedIn,
  setNewUserSession,
  deleteUserSession,
  hashPassword,
  verifyPassword,
};

export default auth;
