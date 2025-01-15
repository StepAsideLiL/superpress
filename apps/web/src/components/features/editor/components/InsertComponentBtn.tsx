"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SearchInput } from "./editor-ui/SearchInput";
import { useState } from "react";
import icon from "@/lib/icons";
import { editorStore } from "../libs/store";

export default function InsertComponentBtn() {
  const [search, setSearch] = useState("");

  return (
    <Popover
      open={editorStore.insertComponentPopover.useIsOpen()}
      onOpenChange={(open) =>
        editorStore.insertComponentPopover.setIsOpen(open)
      }
    >
      <PopoverTrigger asChild>
        <Button
          size={"icon"}
          className="size-6"
          onClick={(event) => event.stopPropagation()}
        >
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
          {editorStore.configs.componentGroup
            .filter((elementConfig) =>
              elementConfig.keyWords?.some((keyWord) =>
                keyWord.includes(search.toLowerCase().trim())
              )
            )
            .map((elementConfig) => {
              if (!elementConfig.addElement) return;

              const AddComponentButton = elementConfig.addElement;

              return (
                <AddComponentButton
                  key={elementConfig.lebel}
                  elementConfig={elementConfig}
                />
              );
            })}
        </div>

        {editorStore.configs.componentGroup.filter((elementConfig) =>
          elementConfig.keyWords?.some((keyWord) =>
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
            editorStore.componentSidebar.setIsOpen(true);
            editorStore.insertComponentPopover.setIsOpen(false);
          }}
        >
          Browse All
        </Button>
      </PopoverContent>
    </Popover>
  );
}
