"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Link as MuiLink, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

interface NavLinkProps {
  href: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  "data-testid"?: string;
}

/**
 * Use this for all internal links
 * @param href The URL to go to
 */
const NavLink = (props: NavLinkProps) => {
  const pathname = usePathname();
  const { href, children, sx, "data-testid": dataTestId } = props;

  return (
    <MuiLink
      className={pathname === href ? "active" : ""}
      component={NextLink}
      href={href}
      sx={sx}
      data-testid={dataTestId}
    >
      {children}
    </MuiLink>
  );
};

export default NavLink;
