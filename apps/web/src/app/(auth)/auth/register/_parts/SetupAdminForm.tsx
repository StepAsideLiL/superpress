"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { registerAndSetupAdmin } from "@/lib/actions/register-setup-admin";
import { toast } from "sonner";
import { registerAndSetupAdminFromSchema } from "@/lib/schemas";

export default function SetupAdminForm() {
  const form = useForm<z.infer<typeof registerAndSetupAdminFromSchema>>({
    resolver: zodResolver(registerAndSetupAdminFromSchema),
  });
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(registerAndSetupAdmin, {
    onSuccess: async () => {
      router.refresh();
    },
    onError({ error }) {
      console.error(error);
      toast.error("Some thing went wrong.");
    },
  });

  async function onSubmit(
    values: z.infer<typeof registerAndSetupAdminFromSchema>
  ) {
    await executeAsync(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="siteName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Your site name, used in the title tag.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="siteDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Site Description</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                A short description of your site.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                A unique username for your account. Usernames can have only
                alphanumeric characters, spaces, underscores, hyphens, periods,
                and the @ symbol.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>A valid email address.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Make sure to use a strong password.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Retype your password to confirm.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isExecuting}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
