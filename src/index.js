import React from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import { makeServer } from "./server";
import { VideoProvider } from "./context/videoContext";
import { ThemeProvider } from "./context/themeContext";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
const root = createRoot(document.getElementById("root"));

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <VideoProvider>
            <App />
          </VideoProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
