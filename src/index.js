import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../src/store/store";
const root = createRoot(document.getElementById("root"));

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
  </React.StrictMode>,
);
