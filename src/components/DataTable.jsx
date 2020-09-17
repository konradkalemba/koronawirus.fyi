import React, { useEffect, useMemo, useState } from "react";
import { useStyletron } from "baseui";
import {
  Unstable_StatefulDataTable,
  BooleanColumn,
  CategoricalColumn,
  CustomColumn,
  NumericalColumn,
  StringColumn,
  NUMERICAL_FORMATS,
  DatetimeColumn,
} from "baseui/data-table";
import { Spinner } from "baseui/spinner";

const VOIVODESHIPS = {
  "02": "Dolnośląskie",
  "04": "Kujawsko-Pomorskie",
  10: "Łódzkie",
  "06": "Lubelskie",
  "08": "Lubuskie",
  12: "Małopolskie",
  14: "Mazowieckie",
  16: "Opolskie",
  18: "Podkarpackie",
  20: "Podlaskie",
  22: "Pomorskie",
  24: "Śląskie",
  26: "Świętokrzyskie",
  28: "Warmińsko-Mazurskie",
  30: "Wielkopolskie",
  32: "Zachodniopomorskie",
};

const COLUMNS = [
  CategoricalColumn({
    title: "Województwo",
    mapDataToValue: (data) => VOIVODESHIPS[data.terytId],
  }),
  DatetimeColumn({
    title: "Data",
    mapDataToValue: (data) => new Date(data.date),
    formatString: "yyyy-MM-dd",
  }),
  NumericalColumn({
    title: "Nowe przypadki",
    mapDataToValue: (data) => data.newCases,
  }),
  NumericalColumn({
    title: "Łącznie przypadków",
    mapDataToValue: (data) => data.sumCases,
  }),
  NumericalColumn({
    title: "Nowe zgony",
    mapDataToValue: (data) => data.newDeaths,
  }),
  NumericalColumn({
    title: "Łącznie zgonów",
    mapDataToValue: (data) => data.sumDeaths,
  }),
  NumericalColumn({
    title: "Nowe wyzdrowienia",
    mapDataToValue: (data) => data.newCured,
  }),
  NumericalColumn({
    title: "Łącznie wyzdrowień",
    mapDataToValue: (data) => data.sumCured,
  }),
];

export default function DataTable() {
  const [css] = useStyletron();
  const [rows, setRows] = useState([]);
  const [includedColumns, setIncludedColumns] = useState(
    COLUMNS.map((c) => c.title)
  );
  const columns = useMemo(() => {
    return COLUMNS.filter((c) => includedColumns.includes(c.title));
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(process.env.REACT_APP_DATA_URL);

      if (response.ok) {
        setRows(await response.json());
      }
    }

    fetchData();
  }, []);

  return (
    <div className={css({ height: "400px" })}>
      {!rows.length ? (
        <Spinner />
      ) : (
        <Unstable_StatefulDataTable
          resizableColumnWidths={true}
          columns={columns}
          rows={rows.map((r) => ({
            id: `${r.terytId}${r.date}`,
            data: { ...r },
          }))}
        />
      )}
    </div>
  );
}
