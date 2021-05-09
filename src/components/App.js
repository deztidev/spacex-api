import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "./Layout.jsx";
import Home from "../pages/Home.jsx";

import "../assets/styles/index.scss";

const App = () => {
  return (
    // <BrowserRouter>
    //   <Layout>
    //     <Switch>
    //       <Route exact path="/" component={Home} />
    //       <Route exact path="/previous-launches" component={PreviousLaunches} />
    //       <Route exact path="/rockets" component={Rockets} />
    //       <Route exact path="/next-launches" component={NextLaunches} />
    //       <Route component={NotFound} />
    //     </Switch>
    //   </Layout>
    // </BrowserRouter>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
