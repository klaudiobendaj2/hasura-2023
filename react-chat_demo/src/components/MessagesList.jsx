import React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TransitionGroup } from "react-transition-group";
import { useChatContext } from "../state/withContext";

const renderItem = ({ content, message_created_at, sender_id }, currentId) => {
  return (
    <ListItem
      sx={{
        justifyContent: sender_id === currentId ? "flex-end" : "flex-start"
      }}
    >
      <Box sx={{ backgroundColor: "#8075FF", borderRadius: "10px", p: 1 }}>
        <ListItemText
          primary={content}
          secondary={message_created_at}
          sx={{ color: "white" }}
        />
      </Box>
    </ListItem>
  );
};

const MessagesList = ({ messages }) => {
  const { currentUserId } = useChatContext();
  const orderedMessages = [...messages].reverse();
  // messages.reverse();

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {orderedMessages.map((item, index) => (
              <Collapse key={index}>{renderItem(item, currentUserId)}</Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
};

export default MessagesList;
