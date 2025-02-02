"use client";

import { editorStore } from "../libs/store";
import { CloseComponentsSidebar } from "./editor-ui/btns";
import { SearchInput } from "./editor-ui/SearchInput";
import { useState } from "react";

export default function ComponentsSidebar() {
  const [search, setSearch] = useState("");

  if (editorStore.componentSidebar.useIsOpen()) {
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
              {editorStore.configs.componentByGroup.map((group) => {
                return (
                  <div key={group.name} className="space-y-2">
                    <h2 className="text-sm font-medium">{group.name}</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {group.elementsConfigs.map((elementConfig) => {
                        if (!elementConfig.addElement) return null;

                        const AddComponentButton = elementConfig.addElement;

                        return (
                          <AddComponentButton
                            key={elementConfig.lebel}
                            elementConfig={elementConfig}
                          />
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
                {editorStore.configs.componentGroup
                  .filter((elementConfig) =>
                    elementConfig.keyWords?.some((keyword) =>
                      keyword.includes(search.toLowerCase().trim())
                    )
                  )
                  .map((elementConfig) => {
                    if (!elementConfig.addElement) return null;

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
            </div>
          )}
        </div>
      </section>
    );
  } else {
    return null;
  }
}
