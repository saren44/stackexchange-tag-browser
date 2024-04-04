import { createTheme } from "@mui/material";

export const themeLight = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#d4d4d4",
    },
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

export const themeDark = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#222222",
    },
    primary: {
      main: "#d4d4d4",
    },
    secondary: {
      main: "#ffff00",
    },
  },
});
