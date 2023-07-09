import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { useChatContext } from "../state/withContext";

const TextInput = ({ sendMessage, scrollToBottom }) => {
  const [message, setMessage] = useState();

  const { currentUserId } = useChatContext();

  const { id: currentSenderId } = useParams();

  const handleSend = (message) => {
    sendMessage({
      variables: {
        message_content: message,
        message_reciever: currentSenderId,
        message_sender: currentUserId
      }
    });
    setMessage("");
    setTimeout(() => scrollToBottom(), [680]);
  };

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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            e.nativeEvent.key === "Enter" ? handleSend(message) : null;
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
          onClick={() => {
            handleSend(message);
          }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default TextInput;
