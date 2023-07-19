import React from 'react';
import { Button } from '@mui/material';
import './Button.css';

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
