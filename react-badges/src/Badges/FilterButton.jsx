import React from "react";
import { Button } from "@mui/material";

const FilterButton = ({ showAll, onClick }) => {
    return (
      <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
        <Button onClick={onClick} variant="contained" >
          {showAll ? 'Show Latest Badges' : 'Show All Badges'}
        </Button>
      </div>
    );
  };

  export default FilterButton;