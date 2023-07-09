import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";

const SignInLayout = ({ handleSignIn, setCredentials, credentials, data }) => {
  // if(data && Boolean(data.sign_in.length)) navigate()

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            value={credentials.input_name}
            onChange={(e) =>
              setCredentials((curr) => {
                return { ...curr, input_name: e.target.value };
              })
            }
            margin="normal"
            required
            fullWidth
            label="User Name"
            autoFocus
          />
          <TextField
            value={credentials.input_password}
            onChange={(e) =>
              setCredentials((curr) => {
                return { ...curr, input_password: e.target.value };
              })
            }
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => handleSignIn(credentials)}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignInLayout;
