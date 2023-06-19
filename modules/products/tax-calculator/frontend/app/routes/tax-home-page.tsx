import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { TaxProductLayout } from "@labset-tax-frontend/tax-product-layout-component";
import React from "react";

const TaxHomePage = () => {
  return (
    <ProfileRequired>
      <TaxProductLayout>
        <h1>tax home page</h1>
      </TaxProductLayout>
    </ProfileRequired>
  );
};

export { TaxHomePage };
