import React from "react";
import { Grid, Cell } from "baseui/layout-grid";
import { DisplayMedium, LabelLarge } from "baseui/typography";
import { Button } from "baseui/button";

import { ArrowNarrowRight, Link } from "tabler-icons-react";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  return (
    <Grid>
      <Cell span={8}>
        <DisplayMedium
          $style={{ marginTop: "300px", fontSize: "60px", fontWeight: 400 }}
        >
          Otwarta darmowa
          <br />
          baza danych o COVID-19
        </DisplayMedium>
        <Button
          $as="a"
          href="/dane"
          $style={({ $theme }) => ({
            textTransform: "uppercase",
            letterSpacing: "1.4px",
            fontSize: "12px",
            paddingLeft: "20px",
            paddingRight: "20px",
            paddingTop: "14px",
            paddingBottom: "14px",
            marginTop: "20px",
            boxShadow: $theme.lighting.shadow600,
          })}
          onClick={(event) => {
            event.preventDefault();
            history.push("/dane");
          }}
          endEnhancer={() => <ArrowNarrowRight size={16} />}
        >
          Przejdź do danych
        </Button>

        <LabelLarge
          $style={{
            textTransform: "uppercase",
            color: "#8B8B8B",
            letterSpacing: "3px",
            fontWeight: 500,
            fontSize: "16px",
            marginTop: "200px",
            marginBottom: "10px",
          }}
        >
          Z bazy danych korzystają:
        </LabelLarge>
        <img
          height="70px"
          src="https://camo.githubusercontent.com/4f1867e60ce6fadb6a37f5e94aeded24aeb7e0b3/68747470733a2f2f692e696d6775722e636f6d2f65756c3833744c2e706e67"
        />
      </Cell>
    </Grid>
  );
}
