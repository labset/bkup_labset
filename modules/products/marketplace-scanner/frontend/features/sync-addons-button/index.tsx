import {
  GetApplicationInfoDocument,
  useSyncAtlassianApplicationAddonsMutation,
} from "@labset-mps-graphql/frontend-types";
import CachedIcon from "@mui/icons-material/Cached";
import { Button } from "@mui/material";
import { noop } from "lodash";
import React from "react";

interface SyncAddonsButtonProps {
  applicationId: string;
}

const SyncAddonsButton = ({ applicationId }: SyncAddonsButtonProps) => {
  const [syncAtlassianApplicationAddons] =
    useSyncAtlassianApplicationAddonsMutation();

  const syncApplications = () => {
    syncAtlassianApplicationAddons({
      variables: { applicationId },
      refetchQueries: [
        {
          query: GetApplicationInfoDocument,
          variables: { applicationId },
        },
      ],
    }).then(noop);
  };

  return (
    <Button startIcon={<CachedIcon />} onClick={syncApplications}>
      Sync Addons
    </Button>
  );
};

export { SyncAddonsButton };
