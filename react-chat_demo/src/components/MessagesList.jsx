import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TransitionGroup } from "react-transition-group";
import { useChatContext } from "../state/withContext";

const renderItem = ({ content, message_created_at, sender_id }, id) => {
  return (
    <ListItem
      sx={{ justifyContent: sender_id === id ? "flex-end" : "flex-start" }}
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

const MessagesList = () => {
  const { currentUserId, messages } = useChatContext();

  const { id } = useParams();

  const currentChatMessages = useMemo(() => {
    return messages.filter(
      (message) =>
        (message.sender_id !== id && message.reciever_id !== currentUserId) ||
        (message.sender_id !== currentUserId && message.reciever_id !== id)
    );
  }, [messages]);

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {currentChatMessages.map((item, index) => (
              <Collapse key={index}>{renderItem(item, id)}</Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
};

export default MessagesList;
