import React, { useContext } from "react";
import AppEntrypoint, { ManagerIcon } from "./containers/AppEntrypoint";
import AssociatedEngineers from "./associated engineers/AssociatedEngineers";
import { DrawerMenu } from "./layouts/BasicLayout";
<<<<<<< HEAD
import AvailableBadges from "./Badges/AvailableBadges";
import CandidatureProposals from './components/CandidatureProposal/CandidatureProposals';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import PostAddIcon from '@mui/icons-material/PostAdd';
import RuleIcon from '@mui/icons-material/Rule';
import ApprovalRejectionIssues from "./IssueRequests/ApprovalRejectionIssues";
import './App.css';
=======
import AvailableBadges from "./Managers/AvailableBadges";
import CandidatureProposals from "./components/CandidatureProposal/CandidatureProposals";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PostAddIcon from "@mui/icons-material/PostAdd";
import RuleIcon from "@mui/icons-material/Rule";
import ApprovalRejectionIssues from "./Managers/ApprovalRejectionIssues";
import ManagerCandidatureProposals from "./components/CandidatureProposal/ManagerCandidatureProposals";
import AddCandidatureProposal from "./components/CandidatureProposal/AddCandidatureProposal";
import "./App.css";
>>>>>>> main
import { AuthContext } from "./state/with-auth";
import { users } from "./views/LoginView";

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

const AppManager: React.FC = () => {
  const { managerId } = useContext(AuthContext);
  const manager = users.find((user) => user.id === managerId);
  console.log('managerid', typeof managerId);

  return (
    <AppEntrypoint
      icon={<ManagerIcon/>}
      title={`${manager?.name} (Manager)`}
      defaultRoute="managers/Badges"
      drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
      mobileUtils={managerMenuItems}
      routes={[
        {
          path: "managers/AssociatedEngineers",
          element: <AssociatedEngineers />,
        },
        {
          path: "managers/badges",
          element: <AvailableBadges />,
        },
        {
          path: 'managers/AddCandidatureProposal/:engineerId/:engineerName',
          element: <AddCandidatureProposal />,      
        },
        {
          path: 'managers/AddCandidatureProposal',
          element: <AddCandidatureProposal />,      
        },
        {
          path: "managers/CandidatureProposals",
          element: <CandidatureProposals />,
        },
        {
          path: "managers/ManagerCandidatureProposals",
          element: <ManagerCandidatureProposals />,
        },
        {
          path: "managers/IssuingRequest",
          element: <ApprovalRejectionIssues />,
        },
      ]}
    />
  );
};


export default AppManager;
