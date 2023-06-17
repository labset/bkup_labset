import { MongoDbIcon } from "@labset-platform-frontend-core/brand-icons-component";
import { Layout } from "@labset-platform-frontend-core/layout-component";
import HiveIcon from "@mui/icons-material/Hive";
import SecurityIcon from "@mui/icons-material/Security";
import React from "react";

import { ProductCard } from "./../components";

const HarnessHomePage = () => {
  return (
    <Layout topNav={{ Logo: HiveIcon, productName: "Harness", namespaces: [] }}>
      <ProductCard
        productTitle={"MongoDB Express"}
        productUrl={"http://localhost:8081"}
        Logo={MongoDbIcon}
      />
      <ProductCard
        Logo={SecurityIcon}
        productTitle={"Atlassian Marketplace Scanner"}
        productUrl={"http://localhost:8000"}
      />
    </Layout>
  );
};

export { HarnessHomePage };
