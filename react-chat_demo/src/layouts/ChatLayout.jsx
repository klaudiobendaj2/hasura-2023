import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";

const ChatLayout = () => {
  return (
    <>
      <ChatAppBar />
      <ChatBox>
        <MessagesList />
      </ChatBox>
      <TextInput />
    </>
  );
};

export default ChatLayout;
