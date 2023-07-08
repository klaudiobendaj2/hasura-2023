import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { Stack } from "@mui/material";

const TextInput = () => {
  return (
    <Stack
      justifyContent="flex-end"
      direction={"row"}
      sx={{
        width: "100%",
        position: "sticky",
        top: "100vh",
        mt: -12,
        height: "20%"
      }}
    >
      <Paper
        component="form"
        sx={{
          display: "flex",
          width: "50%",
          height: "100%",
          alignItems: "center",
          m: 3,
          border: "2px solid #1976d2"
        }}
      >
        <InputBase 
          placeholder="Chat" 
          sx={{ 
            ml: 1,
            flex: 1,
            height: "50px"
          }}
        />
        <Divider
          sx={{ 
            height: 28,
            m: 0.5,
            backgroundColor: "#1976d2",
            width: " 2px"
          }}
          orientation="vertical"
        />
        <IconButton 
          color="primary"
          sx={{ p: "10px" }} 
          aria-label="directions"
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default TextInput;
