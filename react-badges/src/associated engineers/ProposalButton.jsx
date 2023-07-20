import React from 'react';
import { Button } from '@mui/material';

function ProposalButton({ onClick, engineer }) {
  const handleButtonClick = () => {
    onClick(engineer);
  };
  return (
    <Button className='proposalButton' variant="contained" onClick={handleButtonClick}>
      +
    </Button>
  );
}

export default ProposalButton;
