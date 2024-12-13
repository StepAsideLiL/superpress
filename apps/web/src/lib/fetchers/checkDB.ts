import "server-only";

import prisma from "@/lib/prismadb";

/**
 * Checks the database connection by attempting to connect to the database.
 * @returns true if the database connection is successful, false otherwise.
 */
export async function checkDatabaseConnection() {
  try {
    // Try to connect to the database
    await prisma.$connect();
    console.log("Database connection successful!");
    return true;
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    return false;
  }
}

/**
 * Checks if the site admin exists by querying the database for a user with the "admin" capability.
 * @returns true if the site admin exists, false otherwise.
 */
export async function checkSiteAdmin() {
  const user = await prisma.users.findFirst({
    where: {
      usermeta: {
        some: {
          key: "capability",
          value: "admin",
        },
      },
    },
  });

  if (!user) {
    return false;
  }
  return true;
}
