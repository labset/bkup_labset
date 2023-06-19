import { ApplicationInfo } from "@labset-mps-frontend/applications-info-feature";
import { MpsProductLayout } from "@labset-mps-frontend/mps-product-layout-component";
import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import React from "react";
import { useParams } from "react-router-dom";

const MpsApplicationPage = () => {
  const { applicationId } = useParams();

  return (
    <ProfileRequired>
      <MpsProductLayout>
        {applicationId && <ApplicationInfo applicationId={applicationId} />}
      </MpsProductLayout>
    </ProfileRequired>
  );
};

export { MpsApplicationPage };
