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
import { generateFakePostsFormSchema } from "@/lib/schemas";
import { useAction } from "next-safe-action/hooks";
import generateFakePosts from "@/lib/actions/generate-fake-posts";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function GenerateFakePostsForm() {
  const form = useForm<z.infer<typeof generateFakePostsFormSchema>>({
    resolver: zodResolver(generateFakePostsFormSchema),
    defaultValues: {
      postCount: "10",
    },
  });
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(generateFakePosts, {
    onSuccess: () => {
      toast.success("Successfully generated posts");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to generate posts");
    },
  });

  async function onSubmit(values: z.infer<typeof generateFakePostsFormSchema>) {
    await executeAsync({
      postCount: values.postCount,
      status: values.status,
      type: values.type,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="postCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Post</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter number of posts"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a post type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="post">Post</SelectItem>
                    <SelectItem value="page">Page</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Status</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a post status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="trash">Trash</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isExecuting}>
          Generate Post
        </Button>
      </form>
    </Form>
  );
}
