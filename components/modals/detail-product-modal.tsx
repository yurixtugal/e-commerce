"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";
import { ProductAllDetail } from "@/lib/types";

const DetailProductModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isModalOpen = isOpen && type === "detailProduct";
  const product = data?.product;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            {product?.name}
          </DialogTitle>
        </DialogHeader>
        <div className="pt-8 px-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Color</TableHead>
                <TableHead className="text-center">Size</TableHead>
                <TableHead className="text-center">Stock</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product?.variants.map((variant) => {
                return (
                  <TableRow key={variant.id}>
                    <TableCell className="text-center">
                      <div
                        className="w-4 h-4 rounded-full inline-block"
                        style={{ backgroundColor: variant.Color?.value }}
                      ></div>
                    </TableCell>
                    <TableCell className="text-center">
                      {variant.Size?.value}
                    </TableCell> 
                    <TableCell className="text-center">
                      {variant.quantity}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DetailProductModal;
