"use client";

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
import { useModal } from "@/hook/use-modal";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { CommandSeparator } from "cmdk";
import { CheckIcon, ChevronsUpDown, Plus, PlusCircle, StoreIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";


const ComboStore = ( {arrStore} : {arrStore: { id: string; name: string }[]}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const params = useParams();

  const currentStore = arrStore.find((store) => store.id === params.storeId);

  const {onOpen}  = useModal();

  const router = useRouter();

  const onStoreSelect = (store: { id: string; name: string }) => {
    setValue(store.id);
    setOpen(false);
    router.push(`/store/${store.id}`);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between px-[0.5px]"
        >
          <StoreIcon className="pl-1 h-6 w-6 font-semibold" />
          {currentStore?.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            {arrStore.map((store) => (
              <CommandItem
                key={store.id}
                onSelect={() => onStoreSelect(store)}
              >
                {store.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    currentStore?.id === store.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator className="border-t-2 border-gray-100" />
          <CommandGroup>
            <CommandItem key="new-store" onSelect={() => {
              onOpen("createStore")
            } }>
              <PlusCircle className="h-4 w-4" />
              <span className="ml-2">Create new store</span>
            </CommandItem>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboStore;
