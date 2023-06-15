import { useAuthentication } from "@labset-platform-frontend-core/authentication-context-provider";
import { Profile } from "@labset-platform-frontend-core/profile-required-context-provider";
import { UserProfile } from "@labset-platform-frontend-core/user-profile-component";
import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import type { SxProps } from "@mui/material";
import React, { ComponentType } from "react";

interface TopNavigationProps {
  Logo: ComponentType<{ sx?: SxProps }>;
  namespaces: string[];
  productName: string;
  profile?: Profile;
}

const TopNavigationNamespaces = ({ namespaces }: { namespaces: string[] }) => {
  return (
    <>
      {namespaces.map((namespace, index) => (
        <Typography
          key={index}
          sx={{ mr: 2, paddingRight: "0.5rem", borderRight: "0.1rem solid" }}
        >
          {namespace}
        </Typography>
      ))}
    </>
  );
};

const TopNavigation = ({
  Logo,
  namespaces,
  productName,
  profile,
}: TopNavigationProps) => {
  const { actions } = useAuthentication();
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              textDecoration: "none",
              color: "inherit",
              paddingRight: "0.5rem",
              borderRight: "0.1rem solid",
            }}
          >
            {productName}
          </Typography>
          <TopNavigationNamespaces namespaces={namespaces} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            {profile && (
              <UserProfile
                userDisplayName={profile.name}
                userEmail={profile.email}
                userAvatar={profile.pictureUrl}
                onSignOut={actions.signOut}
              />
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export { TopNavigation };
