import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";


const managerMenuItems = [
  {
    link: "managers/Badges",
    text: "Badges",
  
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    
  },
  {
    link: "manager/AddProposal",
    text: "Add Proposal",

  },
  {
    link: "manager/ProposalCandidature",
    text: "Proposal Candidature",

  },
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
        path: "managers/Badges",
        element: <div>a</div>
      },
      {
        path: "managers/AssociatedEngineers",
        element: <div><AssociatedEngineers/></div>
      },
      {
        path: "manager/AddProposal",
        element: <div>b</div>
      },
      {
        path: "manager/ProposalCandidature",
        element: <div>c</div>
      }
    ]}
  />
  );

export default AppManager;
