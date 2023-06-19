import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import React from "react";

const TaxHomePage = () => {
  return (
    <ProfileRequired>
      <h1>tax home page</h1>
    </ProfileRequired>
  );
};

export { TaxHomePage };
