import { ApolloError } from "@apollo/client";
import { Alert, Box, LinearProgress } from "@mui/material";
import type { GridColDef } from "@mui/x-data-grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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

const AddonsTable = ({ loading, error, rows }: AddonsTableProps) => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "key", headerName: "Key", width: 300 },
    { field: "name", headerName: "Name", width: 200 },
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
                  pageSize: 9,
                },
              },
            }}
            pageSizeOptions={[20]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: GridToolbar,
              loadingOverlay: () => <LinearProgress color="secondary" />,
            }}
          />
        </Box>
      )}
    </>
  );
};

export { AddonsTable, AddonInfo };
