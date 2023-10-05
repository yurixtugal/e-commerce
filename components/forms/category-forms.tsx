"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BillBoard, Category, Store } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
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
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  billBoardId: z.string().min(1, {
    message: "Billboard is required.",
  }),
});

interface CategoryFormProps {
  category?: Category | null;
  labelButton?: string;
  storeId?: string;
  arrBillBoards?: BillBoard[];
}

const CategoryForm = ({
  category,
  labelButton,
  storeId,
  arrBillBoards,
}: CategoryFormProps) => {
  console.log("[CATEGORY]", category);

  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category?.name?.toString() || "",
      billBoardId: category?.billBoardId?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (category) {
        await axios.patch(
          `/api/store/${storeId}/category/${category?.id}`,
          values
        );
        toast.success("Category updated successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        await axios.post(`/api/store/${storeId}/category`, values);
        toast.success("Category created successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
      setIsLoading(false);
      router.push(`/store/${storeId}/categories`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid grid-cols-4 gap-10 w-full my-5">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="billBoardId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Billboard</FormLabel>
                  <FormControl>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            arrBillBoards?.find(
                              (billBoard) => billBoard.id === field.value
                            )?.name
                          ) : (
                            <div className="text-gray-500">
                              Select a billboard....
                            </div>
                          )}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput placeholder="Search store..." />
                          <CommandEmpty>No store found.</CommandEmpty>
                          <CommandGroup>
                            {arrBillBoards?.map((billBoard) => (
                              <CommandItem
                                key={billBoard.id}
                                onSelect={() => field.onChange(billBoard.id)}
                              >
                                {billBoard.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    billBoard?.id === field.value
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
          </div>
          <Button type="submit" disabled={isLoading}>
            {labelButton}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default CategoryForm;
