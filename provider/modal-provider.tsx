"use client";

import CreateStoreModal from "@/components/modals/create-store-modal";
import DeleteBillBoardModal from "@/components/modals/delete-billBoard-modal";
import DeleteCategoryModal from "@/components/modals/delete-category-modal";
import DeleteColorModal from "@/components/modals/delete-color-modal";
import DeleteSizeModal from "@/components/modals/delete-size-modal";
import DeleteStoreModal from "@/components/modals/delete-store-modal";
import { useEffect, useState } from "react";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateStoreModal />
      <DeleteStoreModal />
      <DeleteBillBoardModal />
      <DeleteCategoryModal />
      <DeleteSizeModal />
      <DeleteColorModal />
    </>
  );
};

export default ModalProvider;
