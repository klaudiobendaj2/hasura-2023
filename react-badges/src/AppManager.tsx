import React from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from "./components/CandidatureProposal/CandidatureProposals";
import ApprovalRejectionIssues from "./Managers/ApprovalRejectionIssues";

const managerMenuItems = [
  {
    link: 'managers/badges',
    text: 'Badges'
  },
  {
    link: 'managers/AssociatedEngineers',
    text: 'Team Members'
  },
  {
    link: "managers/CandidatureProposals",
    text: "Candidature Proposals"
  },
  {
    link: "managers/ApprovalRejectionIssues",
    text: "Approval Rejection Issues"
  }
];

const AppManager: React.FC = () => (
  <AppEntrypoint
    icon={<ManagerIcon />}
    title="Manager"
    defaultRoute="managers/badges"
    drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
    mobileUtils={managerMenuItems}
    routes={[
      {
        path: "managers/badges",
        element: (
          <div>
            <AvailableBadges />
          </div>
        )
      },
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
        path: "managers/ApprovalRejectionIssues",
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
