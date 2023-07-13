import React, { useContext, useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../state/with-auth';
import { GET_ENGINEERS } from './mutations';
import { GET_BADGES_VERSIONS } from './queries';
import { INSERT_CANDIDATURE_PROPOSAL } from './mutations';

const AddCandidatureProposal = () => {
  const { managerId } = useContext(AuthContext);
  const [engineers, setEngineers] = useState([]);
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const [selectedBadgeVersion, setSelectedBadgeVersion] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');
  const [getEngineersByManager, { loading: engineersLoading, error: engineersError }] = useMutation(GET_ENGINEERS);
  const { loading: versionsLoading, error: versionsError, data: versionsData } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] = useMutation(INSERT_CANDIDATURE_PROPOSAL);

  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const { data } = await getEngineersByManager({ variables: { managerId: parseInt(managerId) } });
        setEngineers(data.get_engineers_by_manager);
      } catch (error) {
        console.error('Error fetching engineers:', error);
      }
    };

    if (managerId) {
      console.log('managerid: ', typeof managerId);
      fetchEngineers();
    }
  }, [managerId, getEngineersByManager]);

  const handleEngineerSelection = (event) => {
    setSelectedEngineer(event.target.value);
  };

  const handleBadgeVersionSelection = (event) => {
    setSelectedBadgeVersion(event.target.value);
  };

  const handleProposalDescriptionChange = (event) => {
    setProposalDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const selectedBadge = versionsData?.badges_versions_last.find(version => String(version.id) === selectedBadgeVersion);
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;
  
      console.log("badge version:", badgeVersion, typeof badgeVersion);
      console.log("badgeId: ", badgeId, typeof badgeId);
      console.log("managerID: ", managerId, typeof managerId);
      console.log("selectedEngineer:", selectedEngineer, typeof selectedEngineer);
      console.log("proposalDesc: ", proposalDescription, typeof proposalDescription);
      
      if (badgeId && badgeVersion && selectedEngineer !== '' && managerId) {
        // Convert badgeVersion to a string representation of timestamp without timezone
        const badgeVersionString = new Date(badgeVersion).toISOString();
        
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersionString,
            engineer: Number(selectedEngineer),
            proposalDescription,
            createdBy: parseInt(managerId, 10)
          }
        });
  
        setSelectedEngineer('');
        setSelectedBadgeVersion('');
        setProposalDescription('');
  
        console.log('Candidature proposal added successfully!');
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

  if (engineersLoading || versionsLoading || addLoading) {
    return <p>Loading...</p>;
  }

  if (engineersError || versionsError || addError) {
    return <p>Error: {engineersError?.message || versionsError?.message || addError?.message}</p>;
  }

  return (
    <div>
      <h1>Add Candidature Proposal</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="engineer">Select an Engineer:</label>
        <select id="engineer" value={selectedEngineer} onChange={handleEngineerSelection}>
          <option value="">None</option>
          {engineers.map((engineer) => (
            <option key={engineer.name} value={engineer.id}>
              {engineer.name}
            </option>
          ))}
        </select>

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
        <textarea
          id="proposalDescription"
          value={proposalDescription}
          onChange={handleProposalDescriptionChange}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCandidatureProposal;
