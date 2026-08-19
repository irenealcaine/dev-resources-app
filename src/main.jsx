import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import App from "./App.jsx";
import { Provider } from "./provider.jsx";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <MotionConfig reducedMotion="user">
          <App />
        </MotionConfig>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
