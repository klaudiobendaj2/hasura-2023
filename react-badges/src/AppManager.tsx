import React from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";




const AppManager: React.FC = () => (


  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="dashboard"
    routes={[
      {
        path: "dashboard",
        element: <div><AssociatedEngineers/></div>
      }
    ]}
  />
  );

export default AppManager;
