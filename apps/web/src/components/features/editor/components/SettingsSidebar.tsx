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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdatePostTitle from "./UpdatePostTitle";

export default function SettingsSidebar() {
  const [open] = useAtom(openSettingsSidebarAtom);
  const [elementId, setElementID] = useAtom(selectedElementIdForEditingAtom);
  const [post] = useAtom(postAtom);
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

                    <UpdatePostTitle />
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
