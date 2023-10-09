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
import {
  Delete,
  Edit2,
  FileKey,
  MoreHorizontal,
  SearchCheckIcon,
  SearchIcon,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  formatValue,
  getColors,
  getSingleQuantity,
  getSize,
} from "@/lib/utils";
import { ModalType, useModal } from "@/hook/use-modal";
import { ProductAllDetail, ProductDetail } from "@/lib/types";
import { Button } from "../ui/button";

interface TableProps {
  arrProducts: ProductAllDetail[];
  store: Store;
}

const ProductTable = ({ arrProducts, store }: TableProps) => {
  const {onOpen} = useModal();
  const router = useRouter();
  
  const onUpdate = (id: string) => {
    router.push(`/store/${store.id}/products/${id}`);
  }

  return (
    <div className="mx-4 my-2 flex justify-between">
      <Table>
        <TableCaption> List of products </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead key="name">Name</TableHead>
            <TableHead key="category" className="text-center">Category</TableHead>
            <TableHead key="colors" className="text-center">Colors</TableHead>
            <TableHead key="sizes" className="text-center">Sizes</TableHead>
            <TableHead key="price" className="text-center">Base Price</TableHead>
            <TableHead key="inventory" className="text-center">Inventory</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arrProducts.map((product) => {
            const colors = getColors(product);
            const sizes = getSize(product);
            return (
              <TableRow key={product.id}>
                <TableCell >{product.name}</TableCell>
                <TableCell className="text-center">{product.Category.name}</TableCell>
                <TableCell className="text-center">
                  {!product.isVariant && "N/A"}
                  <div
                    key={`base_color_${product.id}`}
                    className="space-x-5 inline-flex"
                  >
                    {!!product.isVariant &&
                      colors?.map((color) => {
                        return (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: color?.value }}
                            key={`base_color_${color?.id}`}
                          ></div>
                        );
                      })}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {!product.isVariant && "N/A"}
                  {!!product.isVariant &&
                    sizes?.map((size) => size.value).join(" - ")}
                </TableCell>
                <TableCell className="text-center">{product.basePrice}</TableCell>
                <TableCell className="text-center">
                  {!product.isVariant && (
                    <>
                    {getSingleQuantity(product)}
                    <Button variant="link" className="hidden"
                      onClick={() =>
                        onOpen("detailProduct",{ product} ,undefined)
                      }
                    >
                      <span className="mr-2">View</span>
                      <SearchIcon className="w-4 h-4" />
                    </Button>
                    </>)}
                  {!!product.isVariant && (
                    <Button variant="link"
                      onClick={() =>
                        onOpen("detailProduct",{ product} ,undefined)
                      }
                    >
                      <span className="mr-2">View</span>
                      <SearchIcon className="w-4 h-4" />
                    </Button>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => onUpdate(product.id)}>
                          Update <Edit2 className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() =>{ 
                          onOpen("deleteProduct",{product, store})}}>
                          Delete <Trash2 className="ml-auto h-4 w-4" />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
