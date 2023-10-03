"use client";

import { Plus, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { BillBoard, Store } from "@prisma/client";
import { useModal } from "@/hook/use-modal";
import { useParams, useRouter } from "next/navigation";

const BillBoardHeader = ({ arrBillBoard }: { arrBillBoard: BillBoard[] }) => {
  
  const router = useRouter();  
  const params = useParams();
  
  const addNew = () => {
    router.push(`/store/${params.storeId}/billboards/new`);
  }

  return (
    <div className="mx-4 my-4 flex justify-between">
      <Heading
        title={`Billboards (${arrBillBoard.length})`}
        description="In this section you can manage your billboard"
      />
      <Button variant="default" size="sm" onClick={()=>addNew()}>
        <Plus className="h-5 w-5" /> Add new
      </Button>
    </div>
  );
};

export default BillBoardHeader;
