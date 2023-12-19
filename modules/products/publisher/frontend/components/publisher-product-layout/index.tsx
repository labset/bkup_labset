import { UserProfileLayout } from "@labset-platform-frontend-core/user-profile-layout-component";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import React, { PropsWithChildren } from "react";

const PublisherProductLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProfileLayout
      topNav={{
        Logo: LocalLibraryIcon,
        productName: "Publisher",
        namespaces: [],
      }}
    >
      {children}
    </UserProfileLayout>
  );
};

export { PublisherProductLayout };
