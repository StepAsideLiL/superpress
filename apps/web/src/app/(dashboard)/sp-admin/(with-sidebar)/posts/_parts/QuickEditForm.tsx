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
import DateTimePicker from "@/components/sp-ui/DateTimePicker";
import { useRouter } from "next/navigation";
import { quickEditFormSchema } from "@/lib/schemas";
import { useAction } from "next-safe-action/hooks";
import { updatePostInfoByQuickEdit } from "@/lib/actions/update-post-info-by-quick-edit";
import { toast } from "sonner";

export default function QuickEditForm({
  pageData,
  setQuickEditRowId,
}: {
  pageData: {
    id: string;
    title: string;
    slug: string;
    post_type: string;
    post_status: string;
    created: Date;
    author: {
      username: string;
    };
  };
  setQuickEditRowId: (rowId: string) => void;
}) {
  const form = useForm<z.infer<typeof quickEditFormSchema>>({
    resolver: zodResolver(quickEditFormSchema),
    defaultValues: {
      title: pageData.title,
      slug: pageData.slug,
      status: pageData.post_status,
      date: new Date(pageData.created),
    },
  });

  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(updatePostInfoByQuickEdit, {
    onSuccess: () => {
      setQuickEditRowId("");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update post.");
    },
  });

  function onSubmit(values: z.infer<typeof quickEditFormSchema>) {
    const fromData = {
      postId: pageData.id,
      ...values,
    };

    executeAsync(fromData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center gap-4">
                <FormLabel className="w-28">Title</FormLabel>
                <div className="w-full space-y-2">
                  <FormControl>
                    <Input placeholder="Page Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center gap-4">
                <FormLabel className="w-28">Slug</FormLabel>
                <div className="w-full space-y-2">
                  <FormControl>
                    <Input placeholder="Page Slug" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center gap-4">
                <FormLabel className="w-28">Date</FormLabel>
                <div className="w-full space-y-2">
                  <FormControl>
                    <DateTimePicker
                      date={new Date(field.value)}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <div className="flex w-full items-center gap-4">
                <FormLabel className="w-28">Status</FormLabel>
                <div className="w-full space-y-2">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder={field.value} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          defaultChecked={field.value === "published"}
                          value="published"
                        >
                          Published
                        </SelectItem>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="pending">Pending Review</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="flex items-center gap-2">
          <Button type="submit" disabled={isExecuting}>
            Submit
          </Button>
          <Button
            type="button"
            variant={"outline"}
            disabled={isExecuting}
            onClick={() => setQuickEditRowId("")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
