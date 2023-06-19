import { FormControl, Paper, Stack, TextField } from "@mui/material";
import React from "react";

import "./au-tax-calculator.css";

const AuTaxCalculator = ({ title }: { title: string }) => {
  return (
    <Paper elevation={3}>
      <div className="au-tax-calculator">
        <FormControl fullWidth={true}>
          <Stack spacing={2}>
            <b>{title}</b>
            <TextField
              id="yearly-income"
              type="number"
              placeholder="yearly base income"
              fullWidth={true}
            />
          </Stack>
        </FormControl>
      </div>
    </Paper>
  );
};

export { AuTaxCalculator };
