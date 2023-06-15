import {
  ListApplicationsDocument,
  useSyncAtlassianApplicationsMutation,
} from "@labset-mps-graphql/frontend-types";
import CachedIcon from "@mui/icons-material/Cached";
import { Button } from "@mui/material";
import { noop } from "lodash";
import React from "react";

const SyncApplicationsButton = () => {
  const [syncAtlassianApplications] = useSyncAtlassianApplicationsMutation();

  const syncApplications = () => {
    syncAtlassianApplications({
      refetchQueries: [
        {
          query: ListApplicationsDocument,
        },
      ],
    }).then(noop);
  };

  return (
    <Button startIcon={<CachedIcon />} onClick={syncApplications}>
      Sync Applications
    </Button>
  );
};

export { SyncApplicationsButton };
