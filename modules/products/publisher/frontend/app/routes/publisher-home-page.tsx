import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { PublisherProductLayout } from "@labset-publisher-frontend/publisher-product-layout-component";
import React from "react";

const PublisherHomePage = () => {
  return (
    <ProfileRequired>
      <PublisherProductLayout></PublisherProductLayout>
    </ProfileRequired>
  );
};

export { PublisherHomePage };
