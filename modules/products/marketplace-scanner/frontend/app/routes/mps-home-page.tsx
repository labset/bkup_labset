import { MpsProductLayout } from "@labset-mps-frontend/mps-product-layout-component";
import { SyncApplicationsButton } from "@labset-mps-frontend/sync-applications-button-feature";
import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { Paper } from "@mui/material";
import React from "react";

const MpsHomePage = () => {
  return (
    <ProfileRequired>
      <MpsProductLayout>
        <Paper elevation={6} sx={{ padding: "1rem", marginBottom: "1rem" }}>
          <SyncApplicationsButton />
        </Paper>
      </MpsProductLayout>
    </ProfileRequired>
  );
};

export { MpsHomePage };
