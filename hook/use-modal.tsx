import { ProductAllDetail } from "@/lib/types";
import { BillBoard, Category, Color, Size, Store } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createStore"
  | "deleteStore"
  | "deleteBillBoard"
  | "deleteCategory"
  | "deleteSize"
  | "deleteColor"
  | "deleteProduct"
  | "createVariantProduct"
  | "detailProduct";

interface ModalUtil {
  type: ModalType | null;
  isOpen: boolean;
  data?: DataModal;
  aditionalData?: any;
  onOpen: (modal: ModalType, data?: DataModal, aditionalData?: any) => void;
  onClose: () => void;
}

interface DataModal {
  store?: Store;
  billBoard?: BillBoard;
  category?: Category;
  size?: Size;
  color?: Color;
  product?: ProductAllDetail;
  
} 

export const useModal = create<ModalUtil>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (modal: ModalType, data?: DataModal, aditionalData?: any) =>{ 
    console.log("[ONOPEN]",modal, data, aditionalData);  
    set({ type: modal, isOpen: true, data: data ? data : {}, aditionalData })},
  onClose: () => set({ type: null, isOpen: false }),
}));
