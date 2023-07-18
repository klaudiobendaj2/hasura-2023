import React, { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../state/with-auth';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ProposalButton from './ProposalButton';
import { GET_ENGINEERS } from '../state/queries-mutations.graphql';
import { useNavigate } from 'react-router-dom';

const AssociatedEngineers = () => {
  const { managerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getEngineersByManager, { loading, error, data }] = useMutation(GET_ENGINEERS, {
    variables: { managerId },
  });

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const handleProposalClick = (engineerId) => {
    console.log('Proposal corresponding for engineer with id: ', engineerId);
    navigate(`/managers/AddCandidatureProposal/${engineerId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>List of Engineers</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.get_engineers_by_manager.map((engineer) => (
              <TableRow key={engineer.id}>
                <TableCell>{engineer.name}</TableCell>
                <TableCell>{engineer.roles.join('/')}</TableCell>
                <TableCell>
                <ProposalButton onClick={() => handleProposalClick(engineer.id)} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssociatedEngineers;
