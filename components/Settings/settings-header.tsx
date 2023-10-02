"use client"

import {  Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { Store } from "@prisma/client";
import { useModal } from "@/hook/use-modal";

const SettingsHeader = ({store}: { store: Store }) => {

    const {onOpen} = useModal();

    return (
        <div className="mx-4 my-4 flex justify-between">
        <Heading
          title="Settings"
          description="In this section you can configure your Store"
        />
        <Button variant="destructive" size="sm" onClick={()=>onOpen("deleteStore",{store})}>
          <Trash2Icon className="h-5 w-5" />
        </Button>
      </div> 
      );
}
 
export default SettingsHeader;