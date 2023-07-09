import { Box, Toolbar, Typography } from "@mui/material";
import { styled } from "@mui/system";

const ScrollableBox = styled(Box)`
  /* Scrollbar styles */
  ::-webkit-scrollbar {
    width: 8px;
    background-color: #b9d8f7;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1976d2;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #1976d2;
  }
`;

const ChatBox = ({ children, messagesEndRef }) => {
  return (
    <>
      <ScrollableBox
        component="main"
        sx={{
          p: 3,
          backgroundColor: "#b9d8f7",
          height: "80vh",
          overflowY: "scroll",
          mt: -0.7,
          borderRadius: "10px",
          border: "2px solid #1976d2"
        }}
      >
        <Toolbar />
        {children}
        <div ref={messagesEndRef}></div>
      </ScrollableBox>
    </>
  );
};

export default ChatBox;
