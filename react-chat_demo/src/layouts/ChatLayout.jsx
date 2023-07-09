import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatAppBar from "../components/ChatAppBar";
import ChatBox from "../components/ChatBox";
import TextInput from "../components/TextInput";
import MessagesList from "../components/MessagesList";
import { useChatContext } from "../state/withContext";

const ChatLayout = () => {
  const navigate = useNavigate();
  const { currentUserId } = useChatContext();

  useEffect(() => {
    if (!currentUserId) return navigate("/");
  }, []);

  if (!currentUserId) return <p>Loading....</p>;

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
