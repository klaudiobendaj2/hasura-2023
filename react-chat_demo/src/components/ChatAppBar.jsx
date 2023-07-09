import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { useParams } from "react-router-dom";

const ChatAppBar = ({ senderData }) => {
  const { id } = useParams();

  const userInfo = senderData(id);

  console.log(id);

  return (
    <AppBar position="static" sx={{ borderRadius: "10px 10px 0 0" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title={userInfo.user_name}>
            <IconButton sx={{ p: 0, mr: 2 }}>
              <Avatar alt="Remy Sharp" src={userInfo.user_profile_picture} />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: "flex",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            Jane Smith
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ChatAppBar;
