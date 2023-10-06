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
import { BillBoard, Category, Color, ImagesProduct, Product, Size, Store } from "@prisma/client";
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
import FileUpload from "../ui/file-upload";
import MultiFileUpload from "../ui/multifile-upload";
import { ProductWithImage } from "@/lib/types";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  imagesUrl: z.array(z.string()).min(1, {
    message: "Image is required.",
  }),
});

interface ProductFormProps {
  product?: ProductWithImage;
  labelButton?: string;
  storeId?: string;
  arrCategories?: Category[];
}

const ProductForm = ({ product, labelButton, storeId, arrCategories }: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name?.toString() || "",
      categoryId: product?.categoryId?.toString() || "",
      imagesUrl: product?.images?.map((image) => image.imageUrl) || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (product) {
        await axios.patch(`/api/store/${storeId}/product/${product?.id}`, values);
        toast.success("Product updated successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        await axios.post(`/api/store/${storeId}/product`, values);
        toast.success("Product created successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
      setIsLoading(false);
      router.push(`/store/${storeId}/colors`);
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
              name="imagesUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Images</FormLabel>
                  <FormControl>
                  <MultiFileUpload 
                            endpoint="multipleImages"
                            value={field.value}
                            onChange={field.onChange}
                          />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
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
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel>Category</FormLabel>
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
                            arrCategories?.find(
                              (currentCategory) => currentCategory.id === field.value
                            )?.name
                          ) : (
                            <div className="text-gray-500">
                              Select a category....
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
                            {arrCategories?.map((currentCategory) => (
                              <CommandItem
                                key={currentCategory.id}
                                onSelect={() => field.onChange(currentCategory.id)}
                              >
                                {currentCategory.name}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    currentCategory?.id === field.value
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

export default ProductForm;
