import { Profile } from "@labset-platform-frontend-core/profile-required-context-provider";
import { TopNavigation } from "@labset-platform-frontend-core/top-navigation-component";
import { Box, Container, Toolbar } from "@mui/material";
import type { SxProps } from "@mui/material";
import React, { ComponentType, ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  topNav: {
    Logo: ComponentType<{ sx?: SxProps }>;
    namespaces: string[];
    productName: string;
  };
  profile?: Profile;
}

const Layout = ({ children, topNav, profile }: LayoutProps) => {
  return (
    <Box sx={{ display: "flex" }}>
      <TopNavigation
        Logo={topNav.Logo}
        namespaces={topNav.namespaces}
        productName={topNav.productName}
        profile={profile}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container maxWidth="xl">{children}</Container>
      </Box>
    </Box>
  );
};

export type { LayoutProps };
export { Layout };
