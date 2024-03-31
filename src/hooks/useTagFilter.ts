import { create } from "zustand";

interface FilterState {
	currentFilter: string;
	setFilter: (newFilter: string) => void;
}



export const useTagFilter = create<FilterState>((set) => ({
	currentFilter: '',
	setFilter: (newFilter: string) => set({ currentFilter: newFilter}),
}))