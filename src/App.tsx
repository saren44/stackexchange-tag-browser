import { useEffect, useState } from "react";
import "./App.css";
import { ThemeSwitch } from "./components/ThemeSwitch";
import { TagTableWrapper } from "./components/TagsTable/TagTable";
import { useModalManager } from "./hooks/useModalManager";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useThemeSwitch } from "./hooks";
import { Header } from "./components/Header/Header";
import { PageWrapper } from "./components/PageWrapper/PageWrapper";
import { MobileWrapper } from "./components/MobileWrapper/MobileWrapper";
import { PaginationButtons } from "./components/PaginationController/PaginationController";
import { themeDark, themeLight } from "./utils/themes";

function App() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleWindowSizeChange = () => {
    if (!isMobile && window.innerWidth <= 768) setIsMobile(true);
    else if (isMobile && window.innerWidth > 768) setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  });

  const currentModal = useModalManager((state) => state.currentModal);
  const isLightTheme = useThemeSwitch((state) => state.isLight);

  return (
    <ThemeProvider theme={isLightTheme ? themeLight : themeDark}>
      <CssBaseline />
      {isMobile ? (
        <>
          <MobileWrapper>
            <div
              style={{ position: "absolute", top: 20, right: 20, zIndex: 11 }}
            >
              <ThemeSwitch />
            </div>
            <Header mobile />
            <div
              style={{
                width: "100vw",
                overflowX: "hidden",
                overflowY: "hidden",
              }}
            >
              <TagTableWrapper />
            </div>
            <PaginationButtons />
          </MobileWrapper>
          {currentModal && currentModal}
        </>
      ) : (
        <>
          <PageWrapper>
            <Header mobile={false} />
            <div style={{ width: "70%", minWidth: 768 }}>
              <TagTableWrapper />
            </div>
          </PageWrapper>

          {currentModal && currentModal}
        </>
      )}
    </ThemeProvider>
  );
}

export default App;
