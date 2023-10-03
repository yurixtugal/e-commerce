"use client";

import { Plus, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { BillBoard, Store } from "@prisma/client";
import { useModal } from "@/hook/use-modal";
import { useParams, useRouter } from "next/navigation";

const BillBoardFormHeader = ({ title, description, billBoard, store }: { title: string, description: string, billBoard: BillBoard | null, store: Store | null }) => {
  
  const {onOpen} = useModal();

  const router = useRouter();  
  const params = useParams();
  
  const addNew = () => {
    router.push(`/store/${params.storeId}/billboards/new`);
  }

  if (!billBoard || !store) {
    return (
      <>
      <Heading title={title} description={description} />
      <Button variant="default" size="sm" onClick={()=>addNew()}>
        <Plus className="h-5 w-5" /> Add new
      </Button>
      </>
    )
  }

  return (
    <>
    <Heading title={title} description={description} />
        <Button variant="destructive" size="sm" onClick={()=>onOpen("deleteBillBoard",{store, billBoard})}>
          <Trash2Icon className="h-5 w-5" />
        </Button>
        </>
  );
};

export default BillBoardFormHeader;
