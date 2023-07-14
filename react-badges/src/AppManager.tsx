import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from "./CandidatureProposals";
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PostAddIcon from '@mui/icons-material/PostAdd';

const managerMenuItems = [
  {
    link: "managers/badges",
    text: "Badges",
    icon: <MilitaryTechIcon/>
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    icon: <GroupWorkIcon/>
  },
  {
    link: "managers/CandidatureProposals",
    text: "Candidature Proposals",
    icon: <PostAddIcon/>
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
        element: (
          <div>
            <AssociatedEngineers />
          </div>
        )
      },
      {
        path: "managers/badges",
        element: (
          <div>
            <AvailableBadges/>
          </div>
        )
      },
      {
        path: "managers/CandidatureProposals",
        element: (
          <div>
            <CandidatureProposals/>
          </div>
        )
      }
    ]}
    
  />
);

export default AppManager;