import { useGetApplicationInfoQuery } from "@labset-mps-graphql/frontend-types";
import React from "react";

import { AddonsTable } from "./addons-table";

interface ApplicationInfoProps {
  applicationId: string;
}

const ApplicationInfo = ({ applicationId }: ApplicationInfoProps) => {
  const { data, loading, error } = useGetApplicationInfoQuery({
    variables: { applicationId },
  });
  const addons = data?.listApplicationAddons ?? [];
  return (
    <div>
      {data?.getApplication && <h1>{data.getApplication.name}</h1>}
      <AddonsTable loading={loading} rows={addons} error={error} />
    </div>
  );
};

export { ApplicationInfo };
