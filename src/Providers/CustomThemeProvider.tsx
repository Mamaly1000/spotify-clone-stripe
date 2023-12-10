"use client";
import EncodeFont from "@/fonts/encode";
import { ThemeProvider, createTheme } from "@mui/material";
import React, { ReactNode } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1db954",
    },
    secondary:{
      main:"#191414"
    }
  },
  typography: {
    allVariants: {
      color: "#ffffff",
      fontFamily: EncodeFont.style.fontFamily,
      fill: "#ffffff",
      stroke: "#ffffff",
    },
  },
});

const CustomThemeProvider = ({ children }: { children: ReactNode }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
