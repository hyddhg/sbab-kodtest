/* Typescript interface for when you want to use a function instead of a value. */
import { Theme } from "@mui/material/styles";

interface UseFunctionProps {
  theme: Theme;
}

const components = {
  MuiCssBaseline: { defaultProps: { enableColorScheme: true } },
  MuiLink: {
    defaultProps: { underline: "hover" },
    styleOverrides: {
      fontSize: "1.25rem",
      root: {
        "&.active": { textDecoration: "underline" },
      },
    },
  },
  MuiButtonBase: { defaultProps: { disableTouchRipple: true } },
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {},
  },
  MuiAlert: {
    styleOverrides: {
      root: { padding: "12px 16px" },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        transform: "translateX(1px)",
      },
    },
  },

  MuiAccordionSummary: {
    styleOverrides: {
      root: ({ theme }: UseFunctionProps) => ({
        backgroundColor: theme.palette.background.level3,
      }),
      expandIconWrapper: ({ theme }: UseFunctionProps) => ({
        svg: {
          path: {
            color: theme.palette.text.primary,
          },
        },
      }),
    },
  },

  // The way to change all the h1-h6 body etc
  MuiTypography: {
    styleOverrides: {
      h1: {
        fontSize: "3rem",
        // Responsive font size for screens equal or larger than 'sm'
        "@media (min-width:600px)": {
          fontSize: "4rem",
        },
        // Responsive font size for screens equal or larger than 'md'
        "@media (min-width:960px)": {
          fontSize: "4rem",
        },
      },
      h2: {
        margin: "0.25rem 0 0.5rem 0",
        fontSize: "2.15rem",
        "@media (min-width:600px)": {
          fontSize: "2.5rem",
        },
      },
      h3: {
        margin: "0.25rem 0",
        fontSize: "1.25rem",
        "@media (min-width:600px)": {
          fontSize: "1.2rem",
        },
        "@media (min-width:960px)": {
          fontSize: "1.25rem",
        },
      },
      h4: {
        fontSize: "1rem",
        "@media (min-width:600px)": {
          fontSize: "1.1rem",
        },
        "@media (min-width:960px)": {
          fontSize: "1.2rem",
        },
      },
      h5: {
        fontSize: "1rem",
        "@media (min-width:600px)": {
          fontSize: "1.1rem",
        },
        "@media (min-width:960px)": {
          fontSize: "1.2rem",
        },
      },
      h6: {
        fontSize: "1rem",
        "@media (min-width:600px)": {
          fontSize: "1.1rem",
        },
        "@media (min-width:960px)": {
          fontSize: "1.2rem",
        },
      },
      body1: {
        fontSize: "1.1rem",
        "@media (min-width:600px)": {
          fontSize: "1rem",
        },
        "@media (min-width:960px)": {
          fontSize: "1.2rem",
        },
      },
      a: {
        alignSelf: "center",
        "@media (min-width:600px)": {
          alignSelf: "left",
        },
      },
    },
  },
};

export default components;
