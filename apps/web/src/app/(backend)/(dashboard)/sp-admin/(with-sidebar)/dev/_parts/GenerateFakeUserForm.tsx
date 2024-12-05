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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { toast } from "sonner";
import { generateFakeUserFormSchema } from "@/lib/schemas";
import { useAction } from "next-safe-action/hooks";
import generateFakeUsers from "@/lib/actions/generate-fake-users";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function GenerateFakeUserForm() {
  const form = useForm<z.infer<typeof generateFakeUserFormSchema>>({
    resolver: zodResolver(generateFakeUserFormSchema),
    defaultValues: {
      userCount: "5",
    },
  });
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(generateFakeUsers, {
    onSuccess: () => {
      toast.success("Successfully generated users");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to generate users");
    },
  });

  async function onSubmit(values: z.infer<typeof generateFakeUserFormSchema>) {
    await executeAsync({
      userCount: values.userCount,
      userRole: values.userRole,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of User</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter number of users"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="userRole"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Role</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="author">Author</SelectItem>
                    <SelectItem value="subscriber">Subscriber</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isExecuting}>
          Generate User
        </Button>
      </form>
    </Form>
  );
}
