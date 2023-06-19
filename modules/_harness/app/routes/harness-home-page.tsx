import { Layout } from "@labset-platform-frontend-core/layout-component";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HiveIcon from "@mui/icons-material/Hive";
import SecurityIcon from "@mui/icons-material/Security";
import React from "react";

import { ProductCard } from "./../components";

const HarnessHomePage = () => {
  return (
    <Layout topNav={{ Logo: HiveIcon, productName: "Harness", namespaces: [] }}>
      <ProductCard
        Logo={SecurityIcon}
        productTitle={"Atlassian Marketplace Scanner"}
        productUrl={"http://localhost:8000"}
      />
      <ProductCard
        productTitle={"Tax Calculator"}
        productUrl={"http://localhost:7000"}
        Logo={AttachMoneyIcon}
      />
    </Layout>
  );
};

export { HarnessHomePage };
