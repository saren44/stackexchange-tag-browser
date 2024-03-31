import { ReactNode } from "react";
import { create } from "zustand";

interface ModalManagerState {
	currentModal: ReactNode | null;
	openModal: (newModal: ReactNode) => void;
	closeModal: () => void;
}

export const useModalManager = create<ModalManagerState>((set) => ({
	currentModal: null,
	openModal: (newModal) => set({ currentModal: newModal}),
	closeModal: () => set({ currentModal: null})
}))