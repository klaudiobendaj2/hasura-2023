import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";
import { useEffect, useRef } from "react";
import { useChatContext } from "../state/withContext";

const ChatLayout = ({ messages, sendMessage }) => {
  const { currentUserId } = useChatContext();
  const latestMessageFromSender = (id) => {
    const clonedMessagges = [...messages];
    return clonedMessagges
      .reverse()
      .find(
        (message) =>
          message.sender_id != currentUserId && message.sender_id == id
      );
  };

  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const orderMessagesByCreatedAt = (messages) => {
    const orderedMessages = [...messages];
    return orderedMessages.sort((a, b) => {
      const dateA = new Date(a.message_created_at);
      const dateB = new Date(b.message_created_at);
      return dateA - dateB;
    });
  };

  return (
    <>
      <ChatAppBar senderData={latestMessageFromSender} />
      <ChatBox messagesEndRef={messagesEndRef}>
        <MessagesList messages={orderMessagesByCreatedAt(messages)} />
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
