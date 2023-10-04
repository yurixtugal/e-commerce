"use client"

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

type ColumnHeader = {
  name: string;
  style: string;
};

interface TableProps<T> {
  arrSource: T[];
  sourceProperties: string[];
  tableType: "BillBoard";
  arrTableHeader: ColumnHeader[];
  title: string;
  root: string;
  sourceModal: string,
  store: Store
}

const TableGeneric = <T,>({
  arrSource,
  sourceProperties,
  tableType,
  arrTableHeader,
  title,
  root,
  sourceModal,
  store
}: TableProps<T>) => {

  const router = useRouter();

  const { onOpen } = useModal();
 

  const onDelete = (id: string) => {
    console.log(id);
    alert("Eliminado"+id)
  }

  const onUpdate = (id: string) => {
    router.push(`${root}/${id}`);
  }

  return (
    <div className="mx-4 my-2 flex justify-between">
      <Table>
        <TableCaption> {title} </TableCaption>
        <TableHeader>
          <TableRow>
            {arrTableHeader.map((header) => (
              <TableHead key={header.name} className={header.style}>
                {header.name}
              </TableHead>
            ))}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {arrSource.map((source) => {
            type ObjectKey = keyof typeof source;
            return (
              <TableRow key={"-"}>
                {sourceProperties.map((property) => {
                  const value = source[property as ObjectKey];

                  return (
                    <TableCell key={property}>{formatValue(value)}</TableCell>
                  );
                })}
                <TableCell>
                  <div className="flex justify-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger><MoreHorizontal /></DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>onUpdate( source['id' as ObjectKey] as string)}>Update <Edit2 className="ml-auto h-4 w-4" /></DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>onOpen(`delete${tableType}` as ModalType,{store,[sourceModal]: source as T})}>Delete <Trash2 className="ml-auto h-4 w-4" /></DropdownMenuItem>
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

export default TableGeneric;
