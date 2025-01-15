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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import icon from "@/lib/icons";
import { editorStore } from "../libs/store";

export default function ViewElementJsonData() {
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
          <div>
            Selected Element Id: {editorStore.selected.useSelected().elementId}
          </div>
          <pre>
            {JSON.stringify(editorStore.element.useElements(), null, 2)}
          </pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
