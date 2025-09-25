"use client";

import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const statuses = [
  { value: "online", label: "Online" },
  { value: "offline", label: "Offline" },
  { value: "pending", label: "Pending" },
];

export default function StatusMonitor({ defaultStatus }: { defaultStatus: string }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(
    statuses.find((s) => s.value === defaultStatus) || statuses[0]
  );

  const handleStatusSelect = (selectedStatus: string) => {
    console.log("Selected status:", selectedStatus);
    setStatus(statuses.find((s) => s.value === selectedStatus) || statuses[0]);
    // Optionally trigger API call, filter orders, etc.
  };

  return (
    <div className="w-full max-w-md">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="w-full justify-between"
          >
            {status.label}
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              {statuses.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => {
                    handleStatusSelect(item.value);
                    setOpen(false);
                  }}
                >
                  {item.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      status.value === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <div className="mt-4 p-3 rounded-lg border text-center">
        <span className="font-medium">Current Status: </span>
        <span
          className={cn(
            "font-bold",
            status.value === "online" && "text-green-600",
            status.value === "offline" && "text-red-600",
            status.value === "pending" && "text-yellow-600"
          )}
        >
          {status.label}
        </span>
      </div>
    </div>
  );
}
