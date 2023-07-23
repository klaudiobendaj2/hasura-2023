import React from "react";
import { Button } from "@mui/material";

const ButtonComponent = ({ variant, color, handleClick, sx, content }) => {
  return (
    <Button variant={variant} color={color} onClick={handleClick} sx={sx}>
      {content}
    </Button>
  );
};

export default ButtonComponent;
