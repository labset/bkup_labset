import { ProfileRequired } from "@labset-platform-frontend-core/profile-required-context-provider";
import { AuTaxCalculator } from "@labset-tax-frontend/au-tax-calculator-component";
import { TaxProductLayout } from "@labset-tax-frontend/tax-product-layout-component";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { Grid, IconButton, InputBase, Paper } from "@mui/material";
import React, { useState } from "react";

const AddCalculator = ({ onAdd }: { onAdd: (value: string) => void }) => {
  const [title, setTitle] = useState<string>("");
  const expand = () => {
    if (title.trim().length > 0) {
      onAdd(title);
      setTitle("");
    }
  };

  return (
    <Paper elevation={2} sx={{ padding: "1rem", display: "flex" }}>
      <InputBase
        placeholder="name"
        sx={{ ml: 1, flex: 1 }}
        fullWidth={true}
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <IconButton type="button" onClick={() => expand()}>
        <OpenInFullIcon />
      </IconButton>
    </Paper>
  );
};

const TaxHomePage = () => {
  const [calculators, setCalculators] = useState<string[]>([]);
  const onAdd = (value: string) => {
    setCalculators([...calculators, value]);
  };

  console.info("** this", calculators);
  return (
    <ProfileRequired>
      <TaxProductLayout>
        <Grid container spacing={2}>
          {calculators.map((title, index) => (
            <Grid item xs={4} key={index}>
              <AuTaxCalculator title={title} />
            </Grid>
          ))}
          {calculators.length < 3 && (
            <Grid item xs={4}>
              <AddCalculator onAdd={onAdd} />
            </Grid>
          )}
        </Grid>
      </TaxProductLayout>
    </ProfileRequired>
  );
};

export { TaxHomePage };
