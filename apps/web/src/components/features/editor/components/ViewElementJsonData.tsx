"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BracesIcon } from "lucide-react";
import { editorElementsAtom } from "../libs/store";
import { useAtom } from "jotai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ViewElementJsonData() {
  const [element] = useAtom(editorElementsAtom);

  return (
    <div>
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DialogTrigger asChild>
                <Button variant={"secondary"} size={"icon"}>
                  <BracesIcon />
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
          <pre>{JSON.stringify(element, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
