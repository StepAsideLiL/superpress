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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Table } from "@tanstack/react-table";
import { ColumnViewType, PostType, UserSettingKVType } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { updateScreenOptions } from "@/lib/actions/update-screen-options";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import icon from "@/lib/icons";

const formSchema = z.object({
  itemPerPage: z.string(),
  columnView: z.array(
    z.object({
      colId: z.string(),
      title: z.string(),
      show: z.boolean(),
    })
  ),
});

export default function ScreenOptions({
  table,
  itemPerPageKV,
  columnViewKV,
}: {
  table: Table<PostType>;
  itemPerPageKV: UserSettingKVType;
  columnViewKV: UserSettingKVType;
}) {
  const columnView = JSON.parse(columnViewKV.value) as ColumnViewType;
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      itemPerPage: itemPerPageKV.value,
      columnView: columnView,
    },
  });

  const router = useRouter();

  const { executeAsync, isExecuting } = useAction(updateScreenOptions, {
    onSuccess: () => {
      toast.success("Saved successfully.");
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to save.");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = [
      { id: itemPerPageKV.id, value: values.itemPerPage },
      { id: columnViewKV.id, value: JSON.stringify(values.columnView) },
    ];
    console.log(formData);
    executeAsync(formData);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <icon.Setting />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="itemPerPage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Items per Page</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-2">
              <Label>View Columns</Label>
              <div className="flex items-center gap-4">
                {columnView.map((column) => {
                  return (
                    <FormField
                      key={column.colId}
                      control={form.control}
                      name="columnView"
                      render={({ field }) => (
                        <FormItem
                          key={column.colId}
                          className="flex items-center gap-2 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={table
                                .getColumn(column.colId)
                                ?.getIsVisible()}
                              onCheckedChange={(checked) => {
                                table
                                  .getColumn(column.colId)
                                  ?.toggleVisibility(!!checked);

                                field.onChange([
                                  ...columnView.filter(
                                    (col) => col.colId !== column.colId
                                  ),
                                  { ...column, show: !!checked },
                                ]);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-base">
                            {column.title}
                          </FormLabel>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </div>

            <Button type="submit" disabled={isExecuting}>
              Save Change
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}
