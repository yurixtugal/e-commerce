import { create } from "zustand";

export type ModalType = "createStore"

interface ModalUtil {
    type: ModalType|null;
    isOpen: boolean;
    onOpen: (modal: ModalType) => void;
    onClose: () => void;
}

export const useModal = create<ModalUtil>((set) => ({
    type: null,
    isOpen: false,
    onOpen: (modal: ModalType) => set({ type: modal, isOpen: true }),
    onClose: () => set({ type: null, isOpen: false }),
}));