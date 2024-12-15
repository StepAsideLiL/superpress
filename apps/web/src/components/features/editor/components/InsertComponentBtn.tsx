"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Plus } from "lucide-react";
import {
  addEditorElementAtom,
  componentGroups,
  openComponentSidebarAtom,
} from "../libs/store";
import { useAtom } from "jotai";
import { SearchInput } from "./editor-ui/SearchInput";
import { useState } from "react";
import { nanoid } from "../libs/utils";

export default function InsertComponentBtn() {
  const [, addEditorElement] = useAtom(addEditorElementAtom);
  const [search, setSearch] = useState("");
  const [, setTrue] = useAtom(openComponentSidebarAtom);

  const components = componentGroups.flatMap((group) => group.components);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size={"icon"} className="size-6">
          <Plus />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="center" className="w-96 space-y-2 p-4">
        <SearchInput
          type="text"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <div className="grid grid-cols-3 gap-2">
          {components
            .filter((component) =>
              component.tags?.some((tag) =>
                tag.includes(search.toLowerCase().trim())
              )
            )
            .map((component) => (
              <Button
                variant="ghost"
                key={component.lebel}
                className="flex h-auto flex-col items-center justify-center gap-2 [&_svg]:size-5"
                onClick={() =>
                  addEditorElement({
                    id: nanoid(),
                    type: component.type,
                    style: component.style,
                    className: component.className,
                    content: component.content
                      ? component.content
                      : component.title,
                  })
                }
              >
                <span>{component.title}</span>
                <component.icon className="size-6" />
              </Button>
            ))}
        </div>

        {components.filter((component) =>
          component.lebel.includes(search.toLowerCase())
        ).length === 0 && (
          <div className="w-full text-center text-muted-foreground">
            No Components
          </div>
        )}

        <Button
          className="w-full"
          onClick={() => {
            setTrue(true);
          }}
        >
          Browse All
        </Button>
      </PopoverContent>
    </Popover>
  );
}
