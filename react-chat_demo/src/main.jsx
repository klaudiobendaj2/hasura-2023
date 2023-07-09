import React from "react";
import ReactDOM from "react-dom/client";
import withRoutes from "./state/withRoutes";
import withApollo from "./state/withApollo";


import App from "./App";

const RoutedApp = withRoutes(App)
const ConnectedApp = withApollo(RoutedApp)

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ConnectedApp />
  // </React.StrictMode>
);
