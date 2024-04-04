import { create } from "zustand";

export type ThemeType = "light" | "dark";

interface ThemeState {
  lightDefault: boolean;
  isLight: boolean;
  switchTheme: () => void;
}

const detectDefaultTheme = () => {
  const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
  return !darkThemeMq.matches;
};

export const useThemeSwitch = create<ThemeState>((set) => ({
  lightDefault: detectDefaultTheme(),
  isLight: detectDefaultTheme(),
  switchTheme: () => set((state) => ({ isLight: !state.isLight })),
}));
