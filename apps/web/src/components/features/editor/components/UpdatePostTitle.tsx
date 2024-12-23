"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAtom } from "jotai";
import { postAtom } from "../libs/store";
import slug from "slug";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1, {
    message: "Post title is required",
  }),
});

export default function UpdatePostTitle() {
  const [post, setPost] = useAtom(postAtom);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
    },
  });
  const pathname = usePathname();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values;

    if (!post) return;

    if (pathname.includes("add-post")) {
      setPost({ ...post, title: title, slug: slug(title) });
    } else {
      setPost({ ...post, title: title });
    }
  }

  return (
    <DialogContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <DialogTitle>Edit Post Title</DialogTitle>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="text" placeholder="Post title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter className="justify-start sm:justify-start">
            <DialogClose asChild>
              <Button type="submit">Save</Button>
            </DialogClose>

            <DialogClose asChild>
              <Button type="button" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
