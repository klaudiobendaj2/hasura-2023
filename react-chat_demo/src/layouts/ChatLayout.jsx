import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";
import { useEffect, useRef } from "react";

const ChatLayout = ({ messages, sendMessage }) => {
  const latestMessageFromSender = (id) => {
    const clonedMessagges = [...messages];
    return clonedMessagges.reverse().find((message) => message.sender_id == id);
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <ChatAppBar senderData={latestMessageFromSender} />
      <ChatBox messagesEndRef={messagesEndRef}>
        <MessagesList messages={messages} />
      </ChatBox>
      <TextInput
        sendMessage={sendMessage}
        ref={messagesEndRef}
        scrollToBottom={scrollToBottom}
      />
    </>
  );
};

export default ChatLayout;
