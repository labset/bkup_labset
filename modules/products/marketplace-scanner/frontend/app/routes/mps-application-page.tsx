import { MpsProductLayout } from "@labset-mps-frontend/mps-product-layout-component";
import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import React from "react";

const MpsApplicationPage = () => {
  return (
    <ProfileRequired>
      <MpsProductLayout>
        <h1>application page</h1>
      </MpsProductLayout>
    </ProfileRequired>
  );
};

export { MpsApplicationPage };
