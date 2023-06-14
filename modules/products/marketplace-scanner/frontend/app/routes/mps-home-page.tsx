import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import React from "react";

const MpsHomePage = () => {
  return (
    <ProfileRequired>
      <h1>home page</h1>
    </ProfileRequired>
  );
};

export { MpsHomePage };
