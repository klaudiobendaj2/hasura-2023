import React from "react";
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
import { useNavigate } from "react-router-dom";

const messages = [
  {
    id: 1,
    primary: "Jane Smith",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person:
      "https://images.pexels.com/photos/4946515/pexels-photo-4946515.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  }
];

const HomeLayout = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Paper round='true'>
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
          {messages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              {id === 1 && (
                <ListSubheader sx={{ bgcolor: "background.paper" }}>
                  Today
                </ListSubheader>
              )}
              <ListItem button onClick={() => navigate(`/chat/${id}`)}>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default HomeLayout;
