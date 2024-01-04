"use client";
import { useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ThemeToggleContext } from "@/components/ThemeToggle/ThemeToggleContext";
import ColorModeType from "@/types/ColorModeType";

interface ThemeToggleProviderProps {
  children: React.ReactNode;
}

export default function ThemeToggleProvider(props: ThemeToggleProviderProps) {
  const { children } = props;

  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const [mode, setMode] = useState<ColorModeType>(
    prefersDarkMode ? "dark" : "light"
  );

  const value = useMemo(
    () => ({
      mode,
      toggleColorMode: () =>
        setMode((prevMode: string) =>
          prevMode === "light" ? "dark" : "light"
        ),
    }),
    [mode]
  );

  return (
    <ThemeToggleContext.Provider value={value}>
      {children}
    </ThemeToggleContext.Provider>
  );
}
