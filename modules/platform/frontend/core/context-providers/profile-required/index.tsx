import { useGetProfileQuery } from "@labset-platform-graphql-core/frontend-types";
import { CircularProgress } from "@mui/material";
import React, { createContext, PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";

interface Profile {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
}

const ProfileRequiredContext = createContext<{ profile: Profile }>({
  profile: {
    id: "",
    email: "",
    name: "",
    pictureUrl: "",
  },
});

const useProfileRequired = () => useContext(ProfileRequiredContext);

const ProfileRequiredProvider = ({
  children,
  profile,
}: PropsWithChildren & { profile: Profile }) => {
  return (
    <ProfileRequiredContext.Provider value={{ profile }}>
      {children}
    </ProfileRequiredContext.Provider>
  );
};

const ProfileRequired = ({ children }: PropsWithChildren) => {
  const { data, loading, error } = useGetProfileQuery({
    fetchPolicy: "no-cache",
  });

  return (
    <>
      {loading && <CircularProgress color="secondary" />}
      {!loading && (!data?.getProfile || error) && <Navigate to="/login" />}
      {!loading && !error && data?.getProfile && (
        <ProfileRequiredProvider profile={data.getProfile}>
          {children}
        </ProfileRequiredProvider>
      )}
    </>
  );
};

export { ProfileRequired, Profile, useProfileRequired };
