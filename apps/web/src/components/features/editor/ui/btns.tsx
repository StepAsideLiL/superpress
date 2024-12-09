import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import {
  toggleComponentSidebarAtom,
  toggleSettingsSidebarAtom,
} from "../store";
import { PanelRight, Plus } from "lucide-react";

export function SaveButton() {
  return <Button>Save</Button>;
}

export function ToggleComponentsSidebar() {
  const [, toggleSidebar] = useAtom(toggleComponentSidebarAtom);

  return (
    <Button size={"icon"} onClick={() => toggleSidebar()}>
      <Plus />
    </Button>
  );
}

export function ToggleSettingsSidebar() {
  const [, toggleSidebar] = useAtom(toggleSettingsSidebarAtom);

  return (
    <Button size={"icon"} onClick={() => toggleSidebar()}>
      <PanelRight />
    </Button>
  );
}
