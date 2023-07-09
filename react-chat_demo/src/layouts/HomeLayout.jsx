import React, { useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";


const HomeLayout = ({ data: { messages_with_user_data } }) => {
  console.log(messages_with_user_data);

  const latestMessages = useMemo(() => {
    const latestMessages = {};

    for (const message of messages_with_user_data) {
      const { sender_id, message_created_at } = message;

      if (
        !(sender_id in latestMessages) ||
        message_created_at > latestMessages[sender_id].message_created_at
      ) {
        latestMessages[sender_id] = message;
      }
    }

    const result = Object.values(latestMessages);

    return result;
  }, [messages_with_user_data]);

  return (
    <React.Fragment>
      <Paper round="true">
        <AppBar position="static" sx={{ borderRadius: "10px 10px 0 0" }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                sx={{ p: 2, pb: 0 }}
              >
                Inbox
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>

        <List sx={{ mb: 2 }}>
          {latestMessages.map(
            ({ message_id, user_name, content, user_profile_picture, sender_id }) => (
              <React.Fragment key={message_id}>
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  Today
                </ListSubheader>
                <ListItem button onClick={() => navigate(`/chat/${sender_id}`)}>
                  <ListItemAvatar>
                    <Avatar alt="Profile Picture" src={user_profile_picture} />
                  </ListItemAvatar>
                  <ListItemText primary={user_name} secondary={content} />
                </ListItem>
              </React.Fragment>
            )
          )}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default HomeLayout;
