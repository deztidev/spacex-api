import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./Header.jsx";

import "../assets/styles/index.scss";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

export default App;
