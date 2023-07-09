import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

const ChatLayout = ({ messages }) => {
  const latestMessageFromSender = (id) => {
    const clonedMessagges = [...messages];
    return clonedMessagges.reverse().find((message) => message.sender_id == id);
  };

  console.log(latestMessageFromSender);

  return (
    <>
      <ChatAppBar senderData={latestMessageFromSender} />
      <ChatBox>
        <MessagesList messages={messages} />
      </ChatBox>
      <TextInput />
    </>
  );
};

export default ChatLayout;
