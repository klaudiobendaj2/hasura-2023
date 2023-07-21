import React from 'react';
import { Button } from '@mui/material';

function ProposalButton({ onClick, engineer }) {
  const handleButtonClick = () => {
    onClick(engineer);
  };
  return (
    <Button className='proposalButton' sx={{fontSize:"10px"}} variant="contained" onClick={handleButtonClick}>
      Add Proposal
    </Button>
  );
}

export default ProposalButton;
