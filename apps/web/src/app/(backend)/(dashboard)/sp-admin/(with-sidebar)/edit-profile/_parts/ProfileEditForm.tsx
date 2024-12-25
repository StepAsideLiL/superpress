"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserProfileForEditByAdminType } from "@/lib/types";
import { editUserProfileByAdminSchema } from "@/lib/schemas";
import { useAction } from "next-safe-action/hooks";
import updateUserProfileByAdmin from "@/lib/actions/update-user-profile-by-admin";
import { toast } from "sonner";

const formSchema = editUserProfileByAdminSchema.extend({
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  email: z.string().min(1, { message: "Email is required." }),
});

export default function ProfileEditForm({
  user,
}: {
  user: UserProfileForEditByAdminType;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userId: user.userId,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  });

  const { executeAsync, isExecuting } = useAction(updateUserProfileByAdmin, {
    onSuccess: () => {
      toast.success("Updated successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update!");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { firstName, lastName, role, userId } = values;

    executeAsync({
      userId,
      firstName,
      lastName,
      role,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem className="hidden">
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">User id</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Username</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Email</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Role</FormLabel>
                <div className="col-span-6">
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="author">Author</SelectItem>
                      <SelectItem value="contributor">Contributor</SelectItem>
                      <SelectItem value="subscriber">Subscriber</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">First Name</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-12 gap-4">
                <FormLabel className="col-span-2 py-2">Last Name</FormLabel>
                <div className="col-span-6">
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={!form.formState.isDirty || isExecuting}>
          Update User
        </Button>
      </form>
    </Form>
  );
}
