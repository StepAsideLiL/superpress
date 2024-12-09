"use client";

import { openSettingsSidebarAtom } from "../store";
import { useAtom } from "jotai";

export default function SettingsSidebar() {
  const [open] = useAtom(openSettingsSidebarAtom);

  if (open) {
    return (
      <section className="w-[250px] overflow-auto border">
        <div>Post and component settings.</div>
      </section>
    );
  } else {
    return null;
  }
}
