import React from "react";

import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AddCandidatureProposal from "./components/CandidatureProposal/AddCandidatureProposal";

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="dashboard"
    routes={[
      {
        path: "dashboard",
        element: <div><AddCandidatureProposal/></div>
      }
    ]}
  />
);

export default AppManager;
