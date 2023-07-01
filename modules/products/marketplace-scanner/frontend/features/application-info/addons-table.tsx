import { ApolloError } from "@apollo/client";
import { Alert, Box, LinearProgress } from "@mui/material";
import type { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

interface AddonInfo {
  id: string;
  key: string;
  name: string;
}

interface AddonsTableProps {
  loading: boolean;
  error?: ApolloError;
  rows: AddonInfo[];
}

const withHeader = (params: GridColumnHeaderParams) => {
  return <strong>{params.colDef.headerName}</strong>;
};

const AddonsTable = ({ loading, error, rows }: AddonsTableProps) => {
  const columns: GridColDef[] = [
    { field: "key", headerName: "Key", width: 300, renderHeader: withHeader },
    { field: "name", headerName: "Name", width: 400, renderHeader: withHeader },
  ];

  return (
    <>
      {!loading && error && (
        <Alert severity="error">could not list addons</Alert>
      )}
      {!error && (
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 14,
                },
              },
            }}
            density="compact"
            pageSizeOptions={[20]}
            disableRowSelectionOnClick
            slots={{
              loadingOverlay: () => <LinearProgress color="secondary" />,
            }}
          />
        </Box>
      )}
    </>
  );
};

export { AddonsTable, AddonInfo };
