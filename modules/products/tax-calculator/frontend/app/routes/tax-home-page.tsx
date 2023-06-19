import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { AuTaxCalculator } from "@labset-tax-frontend/au-tax-calculator-component";
import { TaxProductLayout } from "@labset-tax-frontend/tax-product-layout-component";
import { Grid } from "@mui/material";
import React from "react";

const TaxHomePage = () => {
  return (
    <ProfileRequired>
      <TaxProductLayout>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <AuTaxCalculator />
          </Grid>
        </Grid>
      </TaxProductLayout>
    </ProfileRequired>
  );
};

export { TaxHomePage };
