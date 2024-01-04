import type { Metadata } from "next";
import ThemeToggleProvider from "@/components/ThemeToggle/ThemeToggleProvider";
import ThemeProvider from "@/components/Theme/ThemeProvider";
import paletteDark from "@/components/Theme/paletteDark";
import paletteLight from "@/components/Theme/paletteLight";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { Box, Container } from "@mui/material";
import NavLink from "@/components/navigation/NavLink";

export const metadata: Metadata = {
  title: "SBAB kodtest",
  description: "Topp 10 av SLs busslinjer med flest stop",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  const { children } = props;

  return (
    <html lang="sv">
      <body>
        <ThemeToggleProvider>
          <ThemeProvider paletteDark={paletteDark} paletteLight={paletteLight}>
            <Container>
              <Box sx={{ display: "flex", gap: 4, p: 4 }}>
                <NavLink href="/">Linjetoppen</NavLink>
                <NavLink href="/kontakt">Kontakt</NavLink>
              </Box>
            </Container>
            {children}
            <Container sx={{ mt: 4 }}>
              <ThemeToggle />
            </Container>
          </ThemeProvider>
        </ThemeToggleProvider>
      </body>
    </html>
  );
}
