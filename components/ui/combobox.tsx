"use client";

import { forwardRef, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";

export type ComboboxItems = {
   value: string;
   label: string;
}[];
export type ComboboxProps = {
   itemList: ComboboxItems;
   value?: string;
   onChange: (value: string) => void;
};

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
   ({ itemList, value, onChange }, ref) => {
      const [open, setOpen] = useState(false);

      return (
         <div ref={ref}>
            <Popover open={open} onOpenChange={setOpen}>
               <PopoverTrigger asChild>
                  <Button
                     variant="outline"
                     role="combobox"
                     aria-expanded={open}
                     className="w-full justify-between"
                  >
                     {value
                        ? itemList.find((item) => item.value === value)?.label
                        : "Select option..."}
                     <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
               </PopoverTrigger>
               <PopoverContent className="w-full p-0">
                  <Command>
                     <CommandInput placeholder="Search options..." />
                     <CommandEmpty>No option found.</CommandEmpty>
                     <CommandGroup>
                        {itemList.map((item) => (
                           <CommandItem
                              key={item.value}
                              onSelect={() => {
                                 onChange(
                                    item.value === value ? "" : item.value
                                 );
                                 setOpen(false);
                              }}
                           >
                              <Check
                                 className={cn(
                                    "mr-2 h-4 w-4",
                                    value === item.value
                                       ? "opacity-100"
                                       : "opacity-0"
                                 )}
                              />
                              {item.label}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </Command>
               </PopoverContent>
            </Popover>
         </div>
      );
   }
);

Combobox.displayName = "Combobox";
