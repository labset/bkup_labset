import { UserProfileLayout } from "@labset-platform-frontend-core/user-profile-layout-component";
import SecurityIcon from "@mui/icons-material/Security";
import React, { PropsWithChildren } from "react";

const MpsProductLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProfileLayout
      topNav={{
        Logo: SecurityIcon,
        productName: "Atlassian Marketplace Scanner",
        namespaces: [],
      }}
    >
      {children}
    </UserProfileLayout>
  );
};

export { MpsProductLayout };
