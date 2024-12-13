"use server";

import { adminSafeActionClient } from "./safe-action";
import prisma from "@/lib/prismadb";
import auth from "@/lib/auth";
import { returnValidationErrors } from "next-safe-action";
import { registerAndSetupAdminFromSchema } from "@/lib/schemas";

/**
 * Register and setup admin account.
 */
const registerAndSetupAdmin = adminSafeActionClient
  .schema(registerAndSetupAdminFromSchema)
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

    await prisma.users
      .create({
        data: {
          username: username.toLowerCase(),
          displayname: username,
          email: email,
          password: await auth.hashPassword(password),
        },
      })
      .then(async (user) => {
        Promise.all([
          // Set user session
          await auth.setNewUserSession(user.id).catch(async (error) => {
            await prisma.users.delete({ where: { id: user.id } });
            console.error(error);
            throw new Error("Failed to set user session.");
          }),

          // Set user options meta data
          await prisma.usermetas
            .createMany({
              data: [
                {
                  user_id: user.id,
                  id: `${user.id}.capability`,
                  key: "capability",
                  value: "admin",
                },
                {
                  user_id: user.id,
                  id: `${user.id}.setting.post.item_limit_per_page`,
                  key: "setting.post.item_limit_per_page",
                  value: "20",
                },
                {
                  user_id: user.id,
                  id: `${user.id}.setting.post.column_view`,
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
            })
            .catch(async (error) => {
              await prisma.users.delete({ where: { id: user.id } });
              console.error(error);
              throw new Error("Failed to create user meta data.");
            }),

          ,
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
              },
            })
            .then(async (post) => {
              await prisma.postmetas
                .create({
                  data: {
                    post: {
                      connect: {
                        id: post.id,
                      },
                    },
                    id: `${post.id}.content`,
                    key: "content",
                    value: "[]",
                  },
                })
                .catch(async (error) => {
                  await prisma.users.delete({ where: { id: user.id } });
                  console.error(error);
                  throw new Error("Failed to post meta data.");
                });
            })
            .catch(async (error) => {
              await prisma.users.delete({ where: { id: user.id } });
              console.error(error);
              throw new Error("Failed to create home page.");
            }),
        ]);
      })
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to create admin account.");
      });
  });

export default registerAndSetupAdmin;
