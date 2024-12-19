"use client";

import {
  listTags,
  openSettingsSidebarAtom,
  postAtom,
  selectedElementIdForEditingAtom,
  selectElementAtom,
  textTags,
} from "../libs/store";
import { useAtom } from "jotai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./editor-ui/Tabs";
import { CloseSettingsSidebar } from "./editor-ui/btns";
import * as df from "date-fns";
import EditText from "./block-edit/EditText";
import EditListItem from "./block-edit/EditListItem";
import EditList from "./block-edit/EditList";
import icon from "@/lib/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import slug from "slug";

export default function SettingsSidebar() {
  const [open] = useAtom(openSettingsSidebarAtom);
  const [elementId, setElementID] = useAtom(selectedElementIdForEditingAtom);
  const [post, setPost] = useAtom(postAtom);
  const [element] = useAtom(selectElementAtom);

  if (open) {
    return (
      <section className="w-[300px] overflow-auto border">
        <Tabs defaultValue={"block"} value={elementId ? "block" : "post"}>
          <div className="flex items-center justify-between border-b border-muted">
            <TabsList>
              <TabsTrigger value="post" onClick={() => setElementID(null)}>
                Post
              </TabsTrigger>
              <TabsTrigger value="block" onClick={() => setElementID("1")}>
                Block
              </TabsTrigger>
            </TabsList>

            <CloseSettingsSidebar />
          </div>

          <TabsContent value="post">
            {post && (
              <div className="space-y-4 px-2">
                <div className="flex items-center gap-2">
                  <icon.Leaf className="size-4" />
                  <Dialog>
                    <DialogTrigger asChild>
                      {post.title !== "" ? (
                        <Button variant={"ghost"} className="font-semibold">
                          {post.title}
                        </Button>
                      ) : (
                        <Button
                          variant={"ghost"}
                          className="text-muted-foreground"
                        >
                          No Title
                        </Button>
                      )}
                    </DialogTrigger>

                    <DialogContent>
                      <DialogTitle>Edit Post Title</DialogTitle>
                      <Input
                        placeholder="Enter post title"
                        value={post.title}
                        onChange={(e) =>
                          setPost({
                            ...post,
                            title: e.target.value,
                            slug: slug(e.target.value),
                          })
                        }
                      />

                      <DialogFooter className="justify-start sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            onClick={() => {
                              setPost({ ...post });
                            }}
                          >
                            Save
                          </Button>
                        </DialogClose>
                        <DialogClose asChild>
                          <Button
                            variant={"outline"}
                            onClick={() => {
                              setPost({
                                ...post,
                                title: "",
                                slug: "",
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <span>Status</span>
                  <span className="capitalize">{post.postStatus}</span>

                  <span>Publish</span>
                  <span>{df.format(new Date(post.created), "PPpp")}</span>

                  <span>Slug</span>
                  {post.slug !== "" ? (
                    <span>{post.slug}</span>
                  ) : (
                    <span className="text-muted-foreground">No Slug</span>
                  )}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="block">
            {!element ? (
              <div className="py-5">
                <p className="text-center text-sm text-muted-foreground">
                  No block selected.
                </p>
              </div>
            ) : (
              <>
                {textTags.includes(element.type) && (
                  <EditText element={element} />
                )}

                {listTags.includes(element.type) && (
                  <EditList element={element} />
                )}

                {element.type === "li" && !Array.isArray(element.content) && (
                  <EditListItem element={element} />
                )}
              </>
            )}
          </TabsContent>
        </Tabs>
      </section>
    );
  } else {
    return null;
  }
}
