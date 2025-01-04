"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import editorStore from "../libs/store";
import { useAtom } from "jotai";
import { SearchInput } from "./editor-ui/SearchInput";
import { useState } from "react";
import icon from "@/lib/icons";
import { elementBlocks } from "../elements";

export default function InsertComponentBtn() {
  const [search, setSearch] = useState("");
  const [, setTrue] = useAtom(editorStore.openComponentSidebarAtom);
  const [open, setOpen] = useAtom(editorStore.openInsertPopoverAtom);

  return (
    <Popover open={open} onOpenChange={(open) => setOpen(open)}>
      <PopoverTrigger asChild>
        <Button size={"icon"} className="size-6">
          <icon.Plus />
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
          {elementBlocks
            .filter((element) =>
              element.keyWords?.some((keyWord) =>
                keyWord.includes(search.toLowerCase().trim())
              )
            )
            .map((element) => {
              const AddComponentButton = element.addElement;
              return (
                <AddComponentButton key={element.lebel} element={element} />
              );
            })}
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

        <Button
          className="w-full"
          onClick={() => {
            setTrue(true);
            setOpen(false);
          }}
        >
          Browse All
        </Button>
      </PopoverContent>
    </Popover>
  );
}
