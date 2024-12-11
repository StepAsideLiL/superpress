"use client";

import {
  openSettingsSidebarAtom,
  postAtom,
  selectedElementIdForEditingAtom,
} from "../libs/store";
import { useAtom } from "jotai";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./editor-ui/Tabs";
import { CloseSettingsSidebar } from "./editor-ui/btns";
import { Leaf } from "lucide-react";
import * as df from "date-fns";

export default function SettingsSidebar() {
  const [open] = useAtom(openSettingsSidebarAtom);
  const [elementId, setElementID] = useAtom(selectedElementIdForEditingAtom);
  const [post] = useAtom(postAtom);

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

          <TabsContent value="post" className="space-y-4 px-2">
            {post && (
              <>
                <div className="flex items-center gap-2">
                  <Leaf className="size-4" />
                  <h1 className="font-semibold">{post.title}</h1>
                </div>

                <div className="grid grid-cols-2 gap-1">
                  <span>Status</span>
                  <span className="capitalize">{post.post_status}</span>

                  <span>Publish</span>
                  <span>{df.format(new Date(post.created), "PPpp")}</span>

                  <span>Slug</span>
                  <span>{post.slug}</span>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="block">Block</TabsContent>
        </Tabs>
      </section>
    );
  } else {
    return null;
  }
}
