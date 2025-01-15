"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./editor-ui/Tabs";
import { CloseSettingsSidebar } from "./editor-ui/btns";
import * as df from "date-fns";
import icon from "@/lib/icons";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import UpdatePostTitle from "./UpdatePostTitle";
import { editorStore } from "../libs/store";

export default function SettingsSidebar() {
  const post = editorStore.post.usePost();
  const selectState = editorStore.selected.useSelected();

  if (editorStore.settingSidebar.useIsOpen()) {
    return (
      <section className="w-[300px] overflow-auto border">
        <Tabs
          defaultValue={"block"}
          value={selectState.elementId ? "block" : "post"}
        >
          <div className="flex items-center justify-between border-b border-muted">
            <TabsList>
              <TabsTrigger
                value="post"
                onClick={() =>
                  editorStore.selected.setSelected({
                    ...selectState,
                    elementId: null,
                  })
                }
              >
                Post
              </TabsTrigger>
              <TabsTrigger
                value="block"
                onClick={() =>
                  editorStore.selected.setSelected({
                    ...selectState,
                    elementId: "1",
                  })
                }
              >
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
            <BlockContent />
          </TabsContent>
        </Tabs>
      </section>
    );
  } else {
    return null;
  }
}

function BlockContent() {
  const seletedElement = editorStore.selected.useSelectedElement();

  if (!seletedElement) {
    return (
      <div className="py-5">
        <p className="text-center text-sm text-muted-foreground">
          No block selected.
        </p>
      </div>
    );
  }

  const elementConfig = editorStore.configs.componentByTag[seletedElement.type];

  if (!elementConfig.sidebar) return null;

  const EditSidebar = elementConfig.sidebar;

  return (
    <div className="divide-y">
      <div className="flex items-center gap-2 px-4 pb-2">
        <elementConfig.icon />
        <h1 className="text-lg">{elementConfig.title}</h1>
      </div>

      <EditSidebar element={seletedElement} />
    </div>
  );
}
