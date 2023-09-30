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

const formSchema = Z.object({
  name: Z.string().nonempty(),
});

const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  let router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<Z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: Z.infer<typeof formSchema>) => {
    const result = await axios.post("/api/store", values);
    console.log(result)
    if (result){
      form.reset();
      
      router.push(`/store/${result.data.id}`);
    }

  };

  if (!isMounted) return null;

  return (
    <>
      <Dialog open>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Create your store
            </DialogTitle>
            <DialogDescription className="text-zinc-500 text-center">
              Please create your store to continue
            </DialogDescription>
          </DialogHeader>
          <div className="px-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Store Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of your store" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="py-5" type="submit">Create</Button>
              </form>
            </Form>
          </div>
          <DialogFooter className="px-4 py-3"></DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InitialModal;
