import React from "react";
import ReactDOM from "react-dom/client";
import withRoutes from "./state/withRoutes";
import withApollo from "./state/withApollo";
import { withContext } from "./state/withContext";

import App from "./App";

const RoutedApp = withRoutes(App);
const ContextedApp = withContext(RoutedApp);
const ConnectedApp = withApollo(ContextedApp);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ConnectedApp />
  // </React.StrictMode>
);
