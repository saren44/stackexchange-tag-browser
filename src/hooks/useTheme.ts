import { create } from "zustand";

export type ThemeType=  'light' | 'dark';

interface ThemeState {
	isLight: boolean;
	switchTheme: () => void;
}

export const useTheme = create<ThemeState>((set) => ({
	isLight: true,
	switchTheme: () => set((state) => ({ isLight: !state.isLight})),
}))