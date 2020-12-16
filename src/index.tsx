import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import shoesStore from "./stores/shoesStore";
import { Provider } from "react-redux";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={shoesStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root"),
);
