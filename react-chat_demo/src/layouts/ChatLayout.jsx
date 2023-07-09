import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";

const ChatLayout = ({ messages, sendMessage }) => {
  const latestMessageFromSender = (id) => {
    const clonedMessagges = [...messages];
    return clonedMessagges.reverse().find((message) => message.sender_id == id);
  };

  return (
    <>
      <ChatAppBar senderData={latestMessageFromSender} />
      <ChatBox>
        <MessagesList messages={messages} />
      </ChatBox>
      <TextInput sendMessage={sendMessage}/>
    </>
  );
};

export default ChatLayout;
