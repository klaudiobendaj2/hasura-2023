import React from 'react';
import AppEntrypoint, { ManagerIcon } from './containers/AppEntrypoint';
import AssociatedEngineers from './associated engineers/AssociatedEngineers';
import { DrawerMenu } from './layouts/BasicLayout';
import AddCandidatureProposal from './components/CandidatureProposal/AddCandidatureProposal';
import CandidatureProposals from './components/CandidatureProposal/CandidatureProposals';

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
    link: 'managers/CandidatureProposals',
    text: 'Candidature Proposals'
  },
];

const AppManager: React.FC = () => {
  return (
    <AppEntrypoint
      icon={<ManagerIcon />}
      title="Manager"
      defaultRoute="managers"
      drawerContents={[<DrawerMenu title="Manager:" items={managerMenuItems} />]}
      mobileUtils={managerMenuItems}
      routes={[
        {
          path: 'managers/AssociatedEngineers',
          element: <AssociatedEngineers />
        },
        {
          path: 'managers/AddProposal/:engineerId',
          element: <AddCandidatureProposal />
        },
        {
          path: 'managers/CandidatureProposals',
          element: <CandidatureProposals />
        }
      ]}
    />
  );
};

export default AppManager;
