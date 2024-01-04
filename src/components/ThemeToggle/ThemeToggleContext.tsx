"use client";
import { createContext } from "react";
export const ThemeToggleContext = createContext({
  mode: "light",
  toggleColorMode: () => {},
});
