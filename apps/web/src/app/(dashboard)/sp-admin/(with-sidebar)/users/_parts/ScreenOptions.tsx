"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { GearIcon } from "@radix-ui/react-icons";

export default function ScreenOptions() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"outline"} size={"icon"}>
          <GearIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-96">
        hello
      </PopoverContent>
    </Popover>
  );
}
