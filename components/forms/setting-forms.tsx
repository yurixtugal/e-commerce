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
import { Store } from "@prisma/client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import FileUpload from "../ui/file-upload";
import { Textarea } from "../ui/textarea";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Checkbox } from "../ui/checkbox";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name must be at least 1 character.",
  }),
  backgroundImageUrl: z.optional(
    z.string().min(1, {
      message: "Background image url must be at least 1 character.",
    })
  ),
  logoImageUrl: z.optional(
    z.string().min(1, {
      message: "Logo image url must be at least 1 character.",
    })
  ),
  address: z.optional(
    z.string().min(1, {
      message: "Address must be at least 1 character.",
    })
  ),
  description: z.optional(
    z.string().min(1, {
      message: "Description must be at least 1 character.",
    })
  ),
  emailSupport: z.optional(
    z.string().email({
      message: "Email must be valid.",
    })
  ),
  phoneSupport: z.optional(
    z.string().min(1, {
      message: "Phone must be at least 1 character.",
    })
  ),
  fbLink: z.optional(
    z.string().min(1, {
      message: "Facebook link must be at least 1 character.",
    })
  ),
  igLink: z.optional(
    z.string().min(1, {
      message: "Instagram link must be at least 1 character.",
    })
  ),
  xLink: z.optional(
    z.string().min(1, {
      message: "X link must be at least 1 character.",
    })
  ),
  tiktokLink: z.optional(
    z.string().min(1, {
      message: "Tiktok link must be at least 1 character.",
    })
  ),
  showWhatsapp: z.boolean(),
});

interface SettingsFormProps {
  store: Store;
}

const SettingsForm = ({ store }: SettingsFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: store.name,
      backgroundImageUrl: store.backgroundImageUrl,
      logoImageUrl: store.logoImageUrl,
      address: store.address,
      description: store.description,
      emailSupport: store.emailSupport,
      phoneSupport: store.phoneSupport,
      fbLink: store.fbLink,
      igLink: store.igLink,
      xLink: store.xLink,
      tiktokLink: store.tiktokLink,
      showWhatsapp: store.showWhatsapp,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await axios.patch(`/api/store/${store.id}`, values);
      setIsLoading(false);
      router.refresh();
      toast.success("Store updated successfully", {
        duration: 3000,
        position: "top-center",
      });
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3 w-full">
            <h2 className="text-2xl font-semibold col-span-3 pt-3 pb-3">
              General information
            </h2>
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
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="resize-none"
                      placeholder="Insert a description of your store"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <h2 className="text-2xl font-semibold col-span-3  pt-3 pb-3">
              Social Media
            </h2>
            <FormField
              control={form.control}
              name="fbLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook Link</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="igLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram Link</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="xLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>X Link</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tiktokLink"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tiktok Link</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h2 className="text-2xl font-semibold col-span-3  pt-3 pb-3">
              Support
            </h2>
            <FormField
              control={form.control}
              name="emailSupport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Support</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneSupport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Support</FormLabel>
                  <FormControl>
                    <Input {...field} disabled={isLoading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showWhatsapp"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Do you want to show whatsapp icon?</FormLabel>
                    <FormDescription>
                      If you want to show whatsapp icon, customers can contact you from the store page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <div></div>
            <h2 className="text-2xl font-semibold col-span-3  pt-3 pb-3">
              Images
            </h2>

<FormField
              control={form.control}
              name="backgroundImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="singleImage"
                      value={field.value||""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logoImageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo Image</FormLabel>
                  <FormControl>
                    <FileUpload
                      endpoint="singleImage"
                      value={field.value||""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

          </div>
          <Button type="submit" disabled={isLoading}>
            Save changes
          </Button>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
