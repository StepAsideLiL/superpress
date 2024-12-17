"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import icon from "@/lib/icons";

import { DropdownMenuItem } from "../ui/dropdown-menu";

export function ModeToggleDropdownMenuItem() {
  const { theme, systemTheme, setTheme } = useTheme();

  function handleClick() {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    const newThemeMatchesSystem = newTheme === systemTheme;
    setTheme(newThemeMatchesSystem ? "system" : newTheme);
  }

  return (
    <DropdownMenuItem
      className="flex w-full cursor-pointer items-center justify-between gap-2"
      onClick={handleClick}
    >
      Dark Mode
      <div className="flex gap-1 rounded-3xl border p-1">
        <icon.Sun className="size-5 rounded-full bg-red-500 p-[2px] text-foreground dark:bg-transparent dark:text-muted-foreground" />
        <icon.Moon className="size-5 rounded-full bg-transparent p-[2px] text-muted-foreground dark:bg-red-500 dark:text-foreground" />
        <span className="sr-only">Toggle theme</span>
      </div>
    </DropdownMenuItem>
  );
}
