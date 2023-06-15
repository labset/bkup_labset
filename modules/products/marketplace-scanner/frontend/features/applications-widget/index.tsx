import { ApplicationCard } from "@labset-mps-frontend/application-card-component";
import { useListApplicationsQuery } from "@labset-mps-graphql/frontend-types";
import { Alert } from "@mui/material";
import React from "react";

import "./applications-widget.css";

const ApplicationsWidget = () => {
  const { loading, data, error } = useListApplicationsQuery();
  return (
    <>
      {!loading && error && (
        <Alert severity="error">could not list atlassian applications</Alert>
      )}
      {!loading && !error && (
        <div className="applications-widget">
          {data?.listApplications.map((application, index) => {
            return (
              <ApplicationCard
                applicationKey={application.key}
                title={application.name}
                link={`/application/${application.id}`}
                key={index}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export { ApplicationsWidget };
