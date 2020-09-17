import React from "react";

import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";
import { BaseProvider } from "baseui";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { theme } from "./theme";

import Home from "./pages/Home";
import Data from "./pages/Data";
import Header from "./components/Header";
import GridBackground from "./components/GridBackground";

const engine = new Styletron();

function App() {
  return (
    <StyletronProvider value={engine}>
      <BaseProvider theme={theme}>
        <Router>
          <GridBackground />
          <Header />

          <Switch>
            <Route path="/dane">
              <Data />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}

export default App;
