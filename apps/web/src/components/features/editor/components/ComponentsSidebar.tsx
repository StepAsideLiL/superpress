"use client";

import { useAtom } from "jotai";
import editorStore from "../libs/store";
import { Button } from "@/components/ui/button";
import { CloseComponentsSidebar } from "./editor-ui/btns";
import { nanoid } from "../libs/utils";
import { SearchInput } from "./editor-ui/SearchInput";
import { useState } from "react";
import { elementBlocks, elementBlocksByGroup } from "../elements";

export default function ComponentsSidebar() {
  const [open] = useAtom(editorStore.openComponentSidebarAtom);
  const [, addEditorElement] = useAtom(editorStore.addEditorElementAtom);
  const [search, setSearch] = useState("");

  if (open) {
    return (
      <section className="w-[350px] overflow-auto border">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-muted px-4 py-2">
            <h1>Components</h1>
            <CloseComponentsSidebar />
          </div>

          <div className="px-4">
            <SearchInput
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {search.trim() === "" ? (
            <div className="space-y-4 px-4 py-2">
              {elementBlocksByGroup.map((group) => {
                return (
                  <div key={group.name} className="space-y-2">
                    <h2 className="text-sm font-medium">{group.name}</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {group.elements.map((element) => {
                        return (
                          <Button
                            key={element.lebel}
                            variant={"ghost"}
                            className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
                            onClick={() =>
                              addEditorElement({
                                id: nanoid(),
                                type: element.defaultContent.type,
                                content: element.defaultContent.content
                                  ? element.defaultContent.content
                                  : "",
                                style: element.defaultContent.style,
                                className: element.defaultContent.className,
                              })
                            }
                          >
                            <span>{element.title}</span>
                            <element.icon className="size-6" />
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4 px-4 py-2">
              <div className="grid grid-cols-3 gap-2">
                {elementBlocks
                  .filter((element) =>
                    element.keyWords?.some((keyword) =>
                      keyword.includes(search.toLowerCase().trim())
                    )
                  )
                  .map((element) => (
                    <Button
                      key={element.lebel}
                      variant={"ghost"}
                      className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
                      onClick={() =>
                        addEditorElement({
                          id: nanoid(),
                          type: element.defaultContent.type,
                          content: element.defaultContent.content
                            ? element.defaultContent.content
                            : "",
                          style: element.defaultContent.style,
                          className: element.defaultContent.className,
                        })
                      }
                    >
                      <span>{element.title}</span>
                      <element.icon className="size-6" />
                    </Button>
                  ))}
              </div>

              {elementBlocks.filter((element) =>
                element.keyWords?.some((keyWord) =>
                  keyWord.includes(search.toLowerCase().trim())
                )
              ).length === 0 && (
                <div className="w-full text-center text-muted-foreground">
                  No Components
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
