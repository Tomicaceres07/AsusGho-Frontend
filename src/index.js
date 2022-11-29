import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";

const divRoot = document.querySelector("#root");
const root = createRoot(divRoot);

root.render(<App />);
