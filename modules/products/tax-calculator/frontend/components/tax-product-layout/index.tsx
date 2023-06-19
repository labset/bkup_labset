import { UserProfileLayout } from "@labset-platform-frontend-core/user-profile-layout-component";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import React, { PropsWithChildren } from "react";

const TaxProductLayout = ({ children }: PropsWithChildren) => {
  return (
    <UserProfileLayout
      topNav={{
        Logo: AttachMoneyIcon,
        productName: "Tax Calculator",
        namespaces: [],
      }}
    >
      {children}
    </UserProfileLayout>
  );
};

export { TaxProductLayout };
