import {
  Layout,
  LayoutProps,
} from "@labset-platform-frontend-core/layout-component";
import { useProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import React from "react";

type UserProfileLayoutProps = Omit<LayoutProps, "profile">;

const UserProfileLayout = ({ children, topNav }: UserProfileLayoutProps) => {
  const { profile } = useProfileRequired();
  return (
    <Layout topNav={{ ...topNav }} profile={profile}>
      {children}
    </Layout>
  );
};

export { UserProfileLayout };
export type { UserProfileLayoutProps };
