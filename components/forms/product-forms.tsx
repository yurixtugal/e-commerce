"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import {
  BillBoard,
  Category,
  Color,
  ImagesProduct,
  Product,
  Size,
  Store,
} from "@prisma/client";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, ChevronsUpDown, PlusCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUpload from "../ui/file-upload";
import MultiFileUpload from "../ui/multifile-upload";
import { ProductAllDetail, ProductDetail } from "@/lib/types";
import { variantSchema } from "@/lib/types";
import { useModal } from "@/hook/use-modal";
import { Checkbox } from "../ui/checkbox";

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
  basePrice: z.coerce
    .number()
    .min(1, {
      message: "Base Price is required.",
    })
    .gt(0, {
      message: "Base Price must be greater than 0.",
    }),
  isVariant: z.boolean(),
  quantity: z.coerce.number(),
  variants: z.array(variantSchema),
  isFeatured: z.boolean(),
});

interface ProductFormProps {
  product?: ProductAllDetail;
  labelButton?: string;
  storeId?: string;
  arrCategories?: Category[];
  arrSizes?: Size[];
  arrColors?: Color[];
}

const ProductForm = ({
  product,
  labelButton,
  storeId,
  arrCategories,
  arrSizes,
  arrColors,
}: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product?.name?.toString() || "",
      categoryId: product?.categoryId?.toString() || "",
      imagesUrl: product?.images?.map((image) => image.imageUrl) || [],
      basePrice: product?.basePrice || 0,
      quantity: product?.variants[0].quantity || 0,
      isVariant: product?.isVariant || false,
      isFeatured: product?.isFeatured || false,
      variants: product?.variants || [],
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (product) {
        await axios.patch(
          `/api/store/${storeId}/product/${product?.id}`,
          values
        );
        toast.success("Product updated successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        console.log(values);
        await axios.post(`/api/store/${storeId}/product`, values);
        toast.success("Product created successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
      setIsLoading(false);
      router.push(`/store/${storeId}/products`);
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
          <div className="grid grid-cols-1 gap-10 w-full my-5">
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
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            arrCategories?.find(
                              (currentCategory) =>
                                currentCategory.id === field.value
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
                                onSelect={() =>
                                  field.onChange(currentCategory.id)
                                }
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
            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Base price</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.watch("isVariant") && (
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
            )}
          </div>
          <div className="grid grid-cols-4 gap-10 w-full my-5">
          <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you want to feature this product?</FormLabel>
                    <FormDescription>
                      If you want to feature this product, it will be show in the principal page of your e-commerce
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isVariant"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you want to add variants?</FormLabel>
                    <FormDescription>
                      If you want to add variants (Size and color), you must
                      enter the quantity and price of each variant in the next
                      step.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          {form.watch("isVariant") && (
            <FormField
              control={form.control}
              name="variants"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="flex space-x-2">
                    <span>Variants (Color, size)</span>
                    <PlusCircle
                      className="h-5 w-5 text-gray-600 hover:text-gray-800 cursor-pointer"
                      onClick={() =>
                        onOpen("createVariantProduct", undefined, {
                          arrColors,
                          arrSizes,
                          form,
                        })
                      }
                    />
                  </FormLabel>
                  <div className="grid grid-cols-8 gap-10 w-full my-3 overflow-y-auto border-black">
                    {field.value?.map((variant, index) => {
                      
                      const colorName = arrColors?.find(
                        (currentColor) => currentColor.id === variant.colorId
                      )?.name;

                      const colorRGB = arrColors?.find(
                        (currentColor) => currentColor.id === variant.colorId
                      )?.value;

                      const sizeValue = arrSizes?.find(
                        (currentSize) => currentSize.id === variant.sizeId
                      )?.value;
                      
                      return (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle>
                              <div className="flex flex-row items-center space-x-2">
                              <div className="rounded-full h-8 w-8 mr-2" style={{backgroundColor: colorRGB}}></div>
                              - <span>{sizeValue}</span>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription>
                              <div className="flex flex-row items-center space-x-2">
                                <div>
                                  <span>Quantity: </span>
                                  <span className="font-bold text-black">
                                    {variant.quantity}
                                  </span>
                                </div>
                                <div>
                                  <span>Price: </span>
                                  <span className="font-bold text-black">{variant.price}</span>
                                </div>
                              </div>
                            </CardDescription>
                          </CardContent>
                          <CardFooter className="flex flex-row justify-start space-x-2 my-1">
                            <Button
                              variant="outline"
                              onClick={() =>
                                onOpen("createVariantProduct", undefined, {
                                  arrColors,
                                  arrSizes,
                                  form,
                                })
                              }
                            >
                              Edit
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    })}
                  </div>
                  <FormControl></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <div className="flex flex-row justify-start space-x-7">
            <Button type="submit" disabled={isLoading}>
              {labelButton}
            </Button>
            <Button variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default ProductForm;
