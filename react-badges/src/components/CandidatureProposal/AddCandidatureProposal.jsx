import React, { useContext, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../state/with-auth';
import { GET_BADGES_VERSIONS } from './queries';
import { INSERT_CANDIDATURE_PROPOSAL } from './mutations';
import { useNavigate } from 'react-router-dom';
const AddCandidatureProposal = ({ selectedEngineer }) => {
  const { managerId } = useContext(AuthContext);
  const [selectedBadgeVersion, setSelectedBadgeVersion] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const { loading: versionsLoading, error: versionsError, data: versionsData } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] = useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const  navigate = useNavigate();
  const handleBadgeVersionSelection = (event) => {
    setSelectedBadgeVersion(event.target.value);
  };

  const handleProposalDescriptionChange = (event) => {
    setProposalDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedBadge = versionsData?.badges_versions_last.find((version) => String(version.id) === selectedBadgeVersion);
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;

      console.log('badge version:', badgeVersion, typeof badgeVersion);
      console.log('badgeId: ', badgeId, typeof badgeId);
      console.log('managerID: ', managerId, typeof managerId);
      console.log('selectedEngineer:', selectedEngineer, typeof selectedEngineer);
      console.log('proposalDesc: ', proposalDescription, typeof proposalDescription);

      if (badgeId && badgeVersion && selectedEngineer !== '' && managerId) {
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersion,
            engineer: parseInt(selectedEngineer),
            proposalDescription,
            createdBy: managerId,
          },
        });

        setSelectedBadgeVersion('');
        setProposalDescription('');

        console.log('Candidature proposal added successfully!');
        navigate('/managers/CandidatureProposals');
      } else {
        console.error('Failed to retrieve badge ID or badge version for the selected version.');
      }
    } catch (error) {
      console.error('Error adding candidature proposal:', error);
    }
  };

  if (!managerId) {
    return <p>Manager ID not available.</p>;
  }

  if (versionsLoading || addLoading) {
    return <p>Loading...</p>;
  }

  if (versionsError || addError) {
    return <p>Error: {versionsError?.message || addError?.message}</p>;
  }

  return (
    <div>
      <h1>Add Candidature Proposal</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="engineer">Engineer ID:</label>
        <input id="engineer" type="text" value={selectedEngineer} disabled />

        <label htmlFor="badgeVersion">Select a Badge Version:</label>
        <select id="badgeVersion" value={selectedBadgeVersion} onChange={handleBadgeVersionSelection}>
          <option value="">None</option>
          {versionsData?.badges_versions_last.map((version) => (
            <option key={version.id} value={version.id}>
              {version.title}
            </option>
          ))}
        </select>

        <label htmlFor="proposalDescription">Proposal Description:</label>
        <textarea id="proposalDescription" value={proposalDescription} onChange={handleProposalDescriptionChange} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCandidatureProposal;
