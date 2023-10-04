"use client";

import { Plus, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { BillBoard, Store } from "@prisma/client";
import { useModal } from "@/hook/use-modal";
import { useParams, useRouter } from "next/navigation";

interface HeaderProps {
  title: string;
  description: string;
  routeAddNew: string;
}

const GenericHeader = ({ title, description, routeAddNew }: HeaderProps) => {
  
  const router = useRouter();  
  const params = useParams();
  
  const addNew = () => {
    router.push(routeAddNew);
  }

  return (
    <div className="mx-4 my-4 flex justify-between">
      <Heading
        title={title}
        description={description}
      />
      <Button variant="default" size="sm" onClick={()=>addNew()}>
        <Plus className="h-5 w-5" /> Add new
      </Button>
    </div>
  );
};

export default GenericHeader;
