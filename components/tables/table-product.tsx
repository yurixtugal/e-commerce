"use client";

import { BillBoard, Store } from "@prisma/client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Delete, Edit2, MoreHorizontal, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatValue } from "@/lib/utils";
import { ModalType, useModal } from "@/hook/use-modal";
import { ProductDetail } from "@/lib/types";



interface TableProps {
  arrProducts: ProductDetail[];
}

const ProductTable = ({
  arrProducts
}: TableProps) => {


  return (
    <div className="mx-4 my-2 flex justify-between">
      <Table>
        <TableCaption> List of products </TableCaption>
        <TableHeader>
          <TableRow>
            
              <TableHead key="name">Name</TableHead>
              <TableHead key="category">Category</TableHead>
              <TableHead key="colors">Colors</TableHead>
              <TableHead key="sizes">Sizes</TableHead>
              <TableHead key="price">Base Price</TableHead>
              <TableHead key="quantity">Quantity</TableHead>
              <TableHead key="inventory">Inventory</TableHead>
              <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        
      </Table>
    </div>
  );
};

export default ProductTable;
