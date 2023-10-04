"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useModal } from "@/hook/use-modal";

const DeleteBillBoardModal = () => {
  
  const { isOpen, onClose, type, data} = useModal();
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();
  const isModalOpen = isOpen && type === "deleteBillBoard"
  const billBoard = data?.billBoard;
  const store = data?.store;
  
  const deleteBillBoard = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/store/${store?.id}/billboard/${billBoard?.id}`);
      setIsLoading(false);
      onClose();
      router.push(`/store/${store?.id}/billboards`)
      router.refresh();
    }catch (error) {
      console.log(error)
      setIsLoading(false);
    }
  }

    return (
      <Dialog open={isModalOpen} onOpenChange={onClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Delete BillBoard 
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to delete {" "}
            <span className="font-semibold">
              {billBoard?.name}
              {" "}
            </span>
            ?
          </DialogDescription>
          <DialogFooter className="px-6 py-4">
            <div className="flex items-center justify-end space-x-2">
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>

              <Button
                onClick={() => {
                  deleteBillBoard();
                }}
                disabled={isLoading}
              >
                Confirm
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}
 
export default DeleteBillBoardModal;