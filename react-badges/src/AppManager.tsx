import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";


const managerMenuItems = [
  {
    link: "managers",
    text: "Badges",
  
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    
  },
  {
    link: "",
    text: "Badges Definitions",

  }
];

const AppManager: React.FC = () => (


  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="managers"
    drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
    mobileUtils={managerMenuItems}
    routes={[
      {
        path: "managers/AssociatedEngineers",
        element: <div><AssociatedEngineers/></div>
      }
    ]}
  />
  );

export default AppManager;
