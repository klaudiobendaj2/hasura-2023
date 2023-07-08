import React from "react";
import ReactDOM from "react-dom/client";
import withRoutes from "./state/withRoutes";


import App from "./App";

const RoutedApp = withRoutes(App)

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <RoutedApp />
  // </React.StrictMode>
);
