import { Box } from "@mui/material";
import { ReactNode } from "react";

interface MobileWrapperProps {
  children: ReactNode;
}

export const MobileWrapper = ({ children }: MobileWrapperProps) => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      width={"100%"}
    >
      {children}
    </Box>
  );
};
