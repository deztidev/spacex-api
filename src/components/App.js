import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Home from "../pages/Home";
import PreviousLaunches from "../pages/PreviousLaunches";
import NextLaunches from "../pages/NextLaunches";
import Rockets from "../pages/Rockets";
import NotFound from "../pages/NotFound";

import "../assets/styles/index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/previous-launches" component={PreviousLaunches} />
          <Route exact path="/next-launches" component={NextLaunches} />
          <Route exact path="/rockets" component={Rockets} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
