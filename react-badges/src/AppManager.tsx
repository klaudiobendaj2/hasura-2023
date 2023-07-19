import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from "./components/CandidatureProposal/CandidatureProposals";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RuleIcon from "@mui/icons-material/Rule";
import ApprovalRejectionIssues from "./Managers/ApprovalRejectionIssues";
import ManagerCandidatureProposals from "./components/CandidatureProposal/ManagerCandidatureProposals";
import "./App.css";

const managerMenuItems = [
  {
    link: "managers/Badges",
    text: "Badges",
    icon: <MilitaryTechIcon />
  },
  {
    link: "managers/AssociatedEngineers",
    text: "Team Members",
    icon: <GroupWorkIcon />
  },
  {
    link: "managers/CandidatureProposals",
    text: "Engineer Proposals",
    icon: <PostAddIcon />
  },
  {
    link: "managers/ManagerCandidatureProposals",
    text: "Manager Proposals",
    icon: <PostAddIcon />
  },
  {
    link: "managers/IssuingRequest",
    text: "Issuing Request",
    icon: <RuleIcon />
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"

    defaultRoute="managers/Badges"

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
        path: "managers/Badges",
        element: (
          <div>
            <AvailableBadges />
          </div>
        )
      },
      {
        path: "managers/CandidatureProposals",
        element: (
          <div>
            <CandidatureProposals />
          </div>
        )
      },
      {
        path: "managers/ManagerCandidatureProposals",
        element: (
          <div>
            <ManagerCandidatureProposals />
          </div>
        )
      },
      {
        path: "managers/IssuingRequest",
        element: (
          <div>
            <ApprovalRejectionIssues />
          </div>
        )
      }
    ]}
  />
);

export default AppManager;
