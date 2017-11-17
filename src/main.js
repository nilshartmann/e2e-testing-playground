// polyfill for IE
require("es6-promise").polyfill();
require("whatwg-fetch");

import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import App from "./components/App";

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById("mount")
  );
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./components/App", () => {
    render(App);
  });
}
