"use client";
import { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import { SxProps, Theme } from "@mui/material/styles";

// import SVG ICONS from icons-material firstly install icons npm add @mui/icons-mater
import DarkIcon from "@mui/icons-material/Bedtime";
import LightIcon from "@mui/icons-material/Brightness1";

// import theme toggle context
import { ThemeToggleContext } from "@/components/ThemeToggle/ThemeToggleContext";

interface ThemeToggleProps {
  sx?: SxProps<Theme>;
}

/**
 * A theme selector where you can choose between dark or light mode
 */
export default function ThemeToggle(props: ThemeToggleProps) {
  const { sx } = props;

  const themeToggle = useContext(ThemeToggleContext);

  return (
    <IconButton sx={sx} onClick={themeToggle.toggleColorMode} color="inherit">
      {themeToggle.mode === "dark" ? (
        <>
          <DarkIcon sx={{ marginRight: "0.5rem" }} /> Dark
        </>
      ) : (
        <>
          <LightIcon sx={{ marginRight: "0.5rem" }} />
          Light
        </>
      )}
    </IconButton>
  );
}
