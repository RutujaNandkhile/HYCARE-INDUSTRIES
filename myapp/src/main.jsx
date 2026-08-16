import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'

import 'bootstrap-icons/font/bootstrap-icons.css';
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/700.css";
/* FONT IMPORTS */
import "@fontsource/inter/400.css";
import "@fontsource/inter/600.css";
import "@fontsource/cinzel/700.css";
import "@fontsource/oswald/500.css";
import "@fontsource/roboto/400.css";
import "@fontsource/oswald/500.css";
import "@fontsource/oswald/700.css";
import "@fontsource/inter/400.css";






ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
