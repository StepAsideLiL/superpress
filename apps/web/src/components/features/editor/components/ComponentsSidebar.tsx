"use client";

import { useAtom } from "jotai";
import { addEditorElementAtom, openComponentSidebarAtom } from "../libs/store";
import { Button } from "@/components/ui/button";
import { CloseComponentsSidebar } from "./editor-ui/btns";
import { nanoid } from "../libs/utils";
import { componentGroups } from "../libs/components";

export default function ComponentsSidebar() {
  const [open] = useAtom(openComponentSidebarAtom);
  const [, addEditorElement] = useAtom(addEditorElementAtom);

  if (open) {
    return (
      <section className="w-[350px] overflow-auto border">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-muted px-4 py-2">
            <h1>Components</h1>
            <CloseComponentsSidebar />
          </div>
          <div className="space-y-4 px-4 py-2">
            {componentGroups.map((group) => {
              return (
                <div key={group.name} className="space-y-2">
                  <h2 className="text-sm font-medium">{group.name}</h2>
                  <div className="grid grid-cols-3 gap-2">
                    {group.components.map((component) => {
                      return (
                        <Button
                          key={component.lebel}
                          variant={"ghost"}
                          className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
                          onClick={() =>
                            addEditorElement({
                              id: nanoid(),
                              type: component.type,
                              content: component.content
                                ? component.content
                                : "",
                              style: component.style,
                              className: component.className,
                            })
                          }
                        >
                          <span>{component.title}</span>
                          <component.icon className="size-6" />
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  } else {
    return null;
  }
}
