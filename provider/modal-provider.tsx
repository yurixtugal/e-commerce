"use client";

import CreateStoreModal from "@/components/modals/create-store-modal";
import { useEffect, useState } from "react";
const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <>
    <CreateStoreModal />
  </>;
};

export default ModalProvider;
