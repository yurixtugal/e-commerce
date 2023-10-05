import { BillBoard, Category, Color, Size, Store } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createStore"
  | "deleteStore"
  | "deleteBillBoard"
  | "deleteCategory"
  | "deleteSize"
  | "deleteColor";

interface ModalUtil {
  type: ModalType | null;
  isOpen: boolean;
  data?: DataModal;
  onOpen: (modal: ModalType, data?: DataModal) => void;
  onClose: () => void;
}

interface DataModal {
  store?: Store;
  billBoard?: BillBoard;
  category?: Category;
  size?: Size;
  color?: Color;
}

export const useModal = create<ModalUtil>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  onOpen: (modal: ModalType, data?: DataModal) =>
    set({ type: modal, isOpen: true, data: data ? data : {} }),
  onClose: () => set({ type: null, isOpen: false }),
}));
