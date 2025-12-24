import { create } from "zustand";

// Какие типы модалок у нас бывают
export type ModalType = "CONFIRM_LOGOUT" | "EDIT_PROFILE" | null;

interface ModalState {
  type: ModalType;
  props: any; // Сюда можно передать любые данные (например, callback для подтверждения)
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  type: null,
  props: {},
  openModal: (type, props = {}) => set({ type, props }),
  closeModal: () => set({ type: null, props: {} }),
}));
