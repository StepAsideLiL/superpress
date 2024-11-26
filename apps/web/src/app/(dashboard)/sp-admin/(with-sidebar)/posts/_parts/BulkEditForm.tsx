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
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import updatePostInfoByBulkEdit from "@/lib/actions/update-post-info-by-bulk-edit";
import { useAction } from "next-safe-action/hooks";
import { bulkEditFormSchema } from "@/lib/schemas";
import { toast } from "sonner";

export default function BulkEditForm({
  selectedPostIds,
  setIsBulkEditTableRowOpen,
  setRowSelection,
  setQuickEditRowId,
}: {
  selectedPostIds: string[];
  setIsBulkEditTableRowOpen: (open: boolean) => void;
  setRowSelection: (selection: object) => void;
  setQuickEditRowId: (rowId: string) => void;
}) {
  const form = useForm<z.infer<typeof bulkEditFormSchema>>({
    resolver: zodResolver(bulkEditFormSchema),
  });
  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(updatePostInfoByBulkEdit, {
    onSuccess: () => {
      setQuickEditRowId("");
      setIsBulkEditTableRowOpen(false);
      setRowSelection({});
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to update posts.");
    },
  });

  async function onSubmit(values: z.infer<typeof bulkEditFormSchema>) {
    const formData = {
      postIds: selectedPostIds,
      status: values.status,
    };

    await executeAsync(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                        <SelectValue placeholder="(no change)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no-change">(no change)</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
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
            onClick={() => setIsBulkEditTableRowOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
}
