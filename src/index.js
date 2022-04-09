import React from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";

const root = createRoot(document.getElementById("root"));

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
