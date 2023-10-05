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
import { BillBoard, Category, Color, Size, Store } from "@prisma/client";
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
  value: z.string().min(1, {
    message: "Value must be at least 1 character.",
  }),
});

interface ColorFormProps {
  color?: Color | null;
  labelButton?: string;
  storeId?: string;
}

const ColorForm = ({ color, labelButton, storeId }: ColorFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: color?.name?.toString() || "",
      value: color?.value?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (color) {
        await axios.patch(`/api/store/${storeId}/color/${color?.id}`, values);
        toast.success("Color updated successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        await axios.post(`/api/store/${storeId}/color`, values);
        toast.success("Color created successfully", {
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
              name="value"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
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

export default ColorForm;
