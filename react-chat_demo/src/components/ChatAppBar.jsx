import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";


const ChatAppBar = () => {

  return (
    <AppBar position="static" sx={{borderRadius: '10px 10px 0 0'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Tooltip title="John Doe">
            <IconButton sx={{ p: 0, mr: 2 }}>
              <Avatar
                alt="Remy Sharp"
                src="https://img.freepik.com/free-photo/handsome-young-man-with-new-stylish-haircut_176420-19636.jpg?w=2000"
              />
            </IconButton>
          </Tooltip>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display:"flex",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none"
            }}
          >
            John Doe
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ChatAppBar;
