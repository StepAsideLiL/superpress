"use client";

import { useAtom } from "jotai";
import { openComponentSidebarAtom } from "../libs/store";

export default function ComponentsSidebar() {
  const [open] = useAtom(openComponentSidebarAtom);

  if (open) {
    return (
      <section className="w-[350px] overflow-auto border">
        <div>List of components</div>
      </section>
    );
  } else {
    return null;
  }
}
