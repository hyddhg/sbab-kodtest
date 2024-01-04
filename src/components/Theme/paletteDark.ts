import { PaletteOptions } from "@mui/material";

const paletteDark: PaletteOptions = {
  mode: "dark",
  background: {
    default: "#000000", // background for everything, level 1
    paper: "#333333", // background for the paper component, level 2
    level3: "#222222", // background for the accordion top, level 3
  },
  text: {
    primary: "#ffffff", // headers
    secondary: "#ffffff", // inside text field
  },
  primary: {
    main: "#FF5555", // highlight 1, primary button, labels on text fields
  },
  secondary: {
    main: "#0C2A5E", // highlight 2, secondary button
  },
  error: {
    main: "#E53935",
  },
  warning: {
    main: "#FFC107",
  },
  info: {
    main: "#2196F3",
  },
  success: {
    main: "#4CAF50",
  },
};

export default paletteDark;
