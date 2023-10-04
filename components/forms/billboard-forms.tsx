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
import { BillBoard, Store } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import "@uploadthing/react/styles.css";
import { UploadButton } from "../ui/uploadthing"; 
import FileUpload from "../ui/file-upload";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  imageUrl: z.string().min(1, {
    message: "Image url must be at least 1 character.",
  }),
});

interface BillBoardFormProps {
  billBoard?: BillBoard | null;
  labelButton?: string;
  storeId?: string;
}

const BillBoardForm = ({
  billBoard,
  labelButton,
  storeId,
}: BillBoardFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: billBoard?.name?.toString() || "",
      imageUrl: billBoard?.imageUrl?.toString() || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      if (billBoard) {
        await axios.patch(
          `/api/store/${storeId}/billboard/${billBoard?.id}`,
          values
        );
        toast.success("Billboard updated successfully", {
          duration: 3000,
          position: "top-center",
        });
      } else {
        await axios.post(`/api/store/${storeId}/billboard`, values);
        toast.success("Billboard created successfully", {
          duration: 3000,
          position: "top-center",
        });
      }
      setIsLoading(false);
      router.push(`/store/${storeId}/billboards`);
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
          <div className="grid grid-cols-4 gap-1 w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-4 gap-1 w-full">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard Image</FormLabel>
                  <FormControl>
                  <FileUpload 
                            endpoint="singleImage"
                            value={field.value}
                            onChange={field.onChange}
                          />
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

export default BillBoardForm;
