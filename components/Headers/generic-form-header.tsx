"use client";

import { Plus, Trash2Icon } from "lucide-react";
import { Button } from "../ui/button";
import Heading from "../ui/heading";
import { BillBoard, Store } from "@prisma/client";
import { ModalType, useModal } from "@/hook/use-modal";
import { useParams, useRouter } from "next/navigation";

interface FormHeaderProps<T> {
  title: string;
  description: string;
  source: T | null;
  store: Store;
  sourceType: string;
  modalType: ModalType;
}

const GenericFormHeader = <T,>({
  title,
  description,
  source,
  store,
  sourceType,
  modalType,
}: FormHeaderProps<T>) => {
  const { onOpen } = useModal();

  const router = useRouter();
  const params = useParams();

  const addNew = () => {
    router.push(`/store/${params.storeId}/billboards/new`);
  };

  return (
    <>
      <Heading title={title} description={description} />

      {source && (
        <Button
          variant="destructive"
          size="sm"
          onClick={() =>
            onOpen(modalType, {
              store,
              [sourceType]: source as T,
            })
          }
        >
          <Trash2Icon className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};

export default GenericFormHeader;
