import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { TransitionGroup } from "react-transition-group";

const FRUITS = [
  { sender_id: 1, message: "AppleAppleAppleAppleAppleAppleApple" },
  { sender_id: 2, message: "BananaBananaBananaBananaBananaBanana" },
  { sender_id: 2, message: "PineapplePineapplePineapplePineapple" },
  { sender_id: 1, message: "CoconutCoconutCoconutCoconut" },
  { sender_id: 2, message: "WatermelonWatermelonWatermelonWatermelon" },
  { sender_id: 1, message: "hihihihihihihihihihihi" },
  { sender_id: 2, message: "heyheyheyheyheyheyheyheyheyhey" },
  { sender_id: 1, message: "hellohellohellohellohellohellohello" },
  { sender_id: 2, message: "bye" },
  { sender_id: 1, message: "ciao" },
  { sender_id: 2, message: "ciao to " }
];

const renderItem = ({ item }) => {
  return (
    <ListItem
      sx={{ justifyContent: item.sender_id === 1 ? "flex-end" : "flex-start" }}
    >
      <Box sx={{ backgroundColor: "#8075FF", borderRadius: "10px", p: 1 }}>
        <ListItemText
          primary={item.message}
          secondary={"09/02/22"}
          sx={{ color: "white" }}
        />
      </Box>
    </ListItem>
  );
};

const MessagesList = () => {
  const [fruitsInBasket, setFruitsInBasket] = React.useState([
    { sender_id: 1, message: "I'll be in the neighbourhood this week. Let's grab a bite to eat" }
  ]);


  return (
    <div style={{ marginBottom: "3rem" }}>
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {fruitsInBasket.map((item, index) => (
              <Collapse key={index}>{renderItem({ item })}</Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  );
};

export default MessagesList;
