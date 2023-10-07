"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Z from "zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { CheckIcon, ChevronsUpDown, Loader } from "lucide-react";
import { variantSchema } from "@/lib/types";
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
import { cn } from "@/lib/utils";
import { Color, Size } from "@prisma/client";

const CreateVriantProductModal = () => {
  const { isOpen, onClose, type, aditionalData } = useModal();
  const [openColor, setOpenColor] = useState(false);
  const [openSize, setOpenSize] = useState(false);
  const arrColors = aditionalData?.arrColors as Color[];

  const arrSizes = aditionalData?.arrSizes as Size[];
  const childForm = aditionalData?.form;

  let isModalOpen = isOpen && type === "createVariantProduct";

  let router = useRouter();

  const form = useForm<Z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      sizeId: "",
      colorId: "",
      price: 0,
      quantity: 0,
    },
  });

  const isLoading = form.formState.isSubmitting;

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: Z.infer<typeof variantSchema>) => {
    try {
      childForm.setValue("variants", [...childForm.getValues("variants"), values]);
      form.reset();
      onClose();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Add your variant
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-center">
              Please Add your variant (Color and Size) for your product
            </DialogDescription>
          </DialogHeader>
          <div className="px-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Popover open={openColor} onOpenChange={setOpenColor}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            arrColors?.find(
                              (currentColor) =>
                              currentColor.id === field.value
                            )?.name
                          ) : (
                            <div className="text-gray-500">
                              Select a color....
                            </div>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search store..." />
                          <CommandEmpty>No color found.</CommandEmpty>
                          <CommandGroup>
                            {arrColors?.map((currentColor) => (
                              <CommandItem
                                key={currentColor.id}
                                onSelect={() =>
                                  field.onChange(currentColor.id)
                                }
                              >
                                {currentColor.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    currentColor?.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Size</FormLabel>
                  <FormControl>
                    <Popover open={openSize} onOpenChange={setOpenSize}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            arrSizes?.find(
                              (currentSize) =>
                              currentSize.id === field.value
                            )?.name
                          ) : (
                            <div className="text-gray-500">
                              Select a size....
                            </div>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search store..." />
                          <CommandEmpty>No size found.</CommandEmpty>
                          <CommandGroup>
                            {arrSizes?.map((currentSize) => (
                              <CommandItem
                                key={currentSize.id}
                                onSelect={() =>
                                  field.onChange(currentSize.id)
                                }
                              >
                                {currentSize.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    currentSize?.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Price </FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

<FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <Button className="py-5" type="submit" disabled={isLoading}>
                  Add
                </Button>
              </form>
            </Form>
          </div>
          <DialogFooter className="px-4 py-3"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateVriantProductModal;
