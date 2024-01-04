"use client";
import { useMemo, useContext } from "react";
import {
  createTheme,
  PaletteOptions,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeToggleContext } from "@/components/ThemeToggle/ThemeToggleContext";
import components from "@/components/Theme/components";

interface ThemeProviderProps {
  children: React.ReactNode;
  paletteLight: PaletteOptions;
  paletteDark: PaletteOptions;
}

export default function ThemeProvider(props: ThemeProviderProps) {
  const { children, paletteLight, paletteDark } = props;

  const themeToggle = useContext(ThemeToggleContext);

  const theme = useMemo(
    () =>
      createTheme(createTheme({}), {
        palette: themeToggle.mode === "light" ? paletteLight : paletteDark,
        components,
      }),
    [paletteDark, paletteLight, themeToggle.mode]
  );

  return (
    <MuiThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
