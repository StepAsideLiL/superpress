"use server";

import auth from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function createAdmin(data: {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  siteName: string;
  siteDescription: string;
}) {
  if (data.password !== data.confirmPassword) {
    return {
      success: false,
      status: "error",
      message: "Passwords do not match",
    };
  }

  try {
    return await prisma.users
      .create({
        data: {
          username: data.username,
          email: data.email,
          password: data.password,
          usermeta: {
            create: {
              key: "capability",
              value: "admin",
            },
          },
        },
      })
      .then(async (user) => {
        return Promise.all([
          // Site Options
          await prisma.options
            .createMany({
              data: [
                {
                  option_name: "site_name",
                  option_value: data.siteName,
                },
                {
                  option_name: "site_description",
                  option_value: data.siteDescription,
                },
              ],
            })
            .catch(async () => {
              await prisma.users.delete({ where: { id: user.id } });
              return {
                success: false,
                status: "error",
                message: "Failed to set site name and description.",
              };
            }),
          // Set session
          await auth.setNewUserSession(user.id).catch(async () => {
            await prisma.users.delete({ where: { id: user.id } });
            return {
              success: false,
              status: "error",
              message: "Failed to set user session.",
            };
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
            .catch(async () => {
              await prisma.users.delete({ where: { id: user.id } });
              return {
                success: false,
                status: "error",
                message: "Failed to create home page.",
              };
            }),
        ]).then(() => {
          return {
            success: true,
            status: "success",
            message: "Admin account created successfully.",
          };
        });
      })
      .catch(() => {
        return {
          success: false,
          status: "error",
          message: "Failed to create admin account.",
        };
      });
  } catch (error) {
    console.error(error);
    return {
      success: false,
      status: "error",
      message: "Failed to run createAdmin server action",
    };
  }
}
