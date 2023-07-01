import { ApplicationInfo } from "@labset-mps-frontend/applications-info-feature";
import { MpsProductLayout } from "@labset-mps-frontend/mps-product-layout-component";
import { SyncAddonsButton } from "@labset-mps-frontend/sync-addon-button-feature";
import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { Paper } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const MpsApplicationPage = () => {
  const { applicationId } = useParams();

  return (
    <ProfileRequired>
      <MpsProductLayout>
        {applicationId && (
          <>
            <Paper elevation={6} sx={{ padding: "1rem", marginBottom: "1rem" }}>
              <SyncAddonsButton applicationId={applicationId} />
            </Paper>
            <ApplicationInfo applicationId={applicationId} />
          </>
        )}
      </MpsProductLayout>
    </ProfileRequired>
  );
};

export { MpsApplicationPage };
