import React from "react";
import { Grid, Cell } from "baseui/layout-grid";
import { DisplayMedium } from "baseui/typography";

import DataTable from "../components/DataTable";

export default function Data() {
  return (
    <Grid>
      <Cell span={12}>
        <DisplayMedium
          $style={{ marginTop: "200px", fontSize: "60px", fontWeight: 400 }}
        >
          Kolekcja danych
        </DisplayMedium>

        <DataTable />
      </Cell>
    </Grid>
  );
}
