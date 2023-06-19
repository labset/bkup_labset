import { useAuthentication } from "@labset-platform-frontend-core/authentication-context-provider";
import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";

const TaxSignInPage = () => {
  const [searchParams] = useSearchParams();
  const { status, actions } = useAuthentication();

  useEffect(() => {
    const claim = searchParams.get("token");
    if (claim && status === "loading") {
      actions.signIn(claim);
    }
  }, [status]);

  return (
    <>
      {status === "loading" && <CircularProgress color="secondary" />}
      {status === "not-authenticated" && <Navigate to="/" />}
      {status === "authenticated" && <Navigate to="/home" />}
    </>
  );
};

export { TaxSignInPage };
