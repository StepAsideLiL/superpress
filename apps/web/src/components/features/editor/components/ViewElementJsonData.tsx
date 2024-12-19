"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  editorElementsAtom,
  selectedElementIdForEditingAtom,
} from "../libs/store";
import { useAtom } from "jotai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import icon from "@/lib/icons";

export default function ViewElementJsonData() {
  const [element] = useAtom(editorElementsAtom);
  const [selectedElementId] = useAtom(selectedElementIdForEditingAtom);

  return (
    <div>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <icon.BracesIcon />
                  <span className="sr-only">View Element Data</span>
                </Button>
              </DialogTrigger>
            </TooltipTrigger>

            <TooltipContent align="center">
              <p>View Element Data</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DialogContent className="max-h-96 overflow-auto">
          <DialogHeader>
            <DialogTitle>Element Data</DialogTitle>
          </DialogHeader>
          <div>Selected Element Id: {selectedElementId}</div>
          <pre>{JSON.stringify(element, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
