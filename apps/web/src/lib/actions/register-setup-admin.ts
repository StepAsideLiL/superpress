"use server";

import { adminSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import {
  flattenValidationErrors,
  returnValidationErrors,
} from "next-safe-action";
import { registerAndSetupAdminFromSchema } from "@/lib/schemas";

/**
 * Register and setup admin account.
 */
const registerAndSetupAdmin = adminSafeActionClient
  .schema(registerAndSetupAdminFromSchema, {
    handleValidationErrorsShape: (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.adminExists) {
      return;
    }

    const {
      username,
      email,
      password,
      confirmPassword,
      siteName,
      siteDescription,
    } = parsedInput;

    if (password !== confirmPassword) {
      returnValidationErrors(registerAndSetupAdminFromSchema, {
        confirmPassword: {
          _errors: ["Passwords do not match."],
        },
      });
    }

    try {
      return await prisma.users
        .create({
          data: {
            username: username,
            email: email,
            password: await auth.hashPassword(password),
            usermeta: {
              createMany: {
                data: [
                  {
                    key: "capability",
                    value: "admin",
                  },
                  {
                    key: "setting.post.item_limit_per_page",
                    value: "20",
                  },
                  {
                    key: "setting.post.column_view",
                    value: JSON.stringify([
                      {
                        colId: "title",
                        title: "Title",
                        show: true,
                      },
                      {
                        colId: "author_username",
                        title: "Author",
                        show: true,
                      },
                      {
                        colId: "created",
                        title: "Date",
                        show: true,
                      },
                    ]),
                  },
                ],
              },
            },
          },
        })
        .then(async (user) => {
          return Promise.all([
            // Set user session
            await auth.setNewUserSession(user.id).catch(async (error) => {
              await prisma.users.delete({ where: { id: user.id } });
              console.error(error);
              throw new Error("Failed to set user session.");
            }),

            // Set site options
            await prisma.options
              .createMany({
                data: [
                  {
                    option_name: "site_name",
                    option_value: siteName,
                    autoload: true,
                  },
                  {
                    option_name: "site_description",
                    option_value: siteDescription,
                    autoload: true,
                  },
                ],
              })
              .catch(async (error) => {
                await prisma.users.delete({ where: { id: user.id } });
                console.error(error);
                throw new Error("Failed to set site name and description.");
              }),

            // Create page
            await prisma.posts
              .create({
                data: {
                  title: "Home",
                  slug: "home",
                  post_type: "page",
                  post_status: "published",
                  author: {
                    connect: {
                      id: user.id,
                    },
                  },
                  postmeta: {
                    create: {
                      key: "content",
                      value: "This is content",
                    },
                  },
                },
              })
              .catch(async (error) => {
                await prisma.users.delete({ where: { id: user.id } });
                console.error(error);
                throw new Error("Failed to create home page.");
              }),
          ]).then(() => {
            return {
              success: true,
              status: "success",
              message: "Admin account created successfully.",
            };
          });
        })
        .catch((error) => {
          console.error(error);
          throw new Error("Failed to create admin account.");
        });
    } catch (error) {
      console.error(error);
      throw new Error("Failed to create admin account.");
    }
  });

export default registerAndSetupAdmin;
