import { useEffect } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../state/withContext";
import ChatLayout from "../layouts/ChatLayout";

const GET_CURRENT_MESSAGES = gql`
  query GetCurrentMessages($current_user: Int!) {
    messages_with_user_data(
      where: {
        _or: [
          { receiver_id: { _eq: $current_user } }
          { sender_id: { _eq: $current_user } }
        ]
      }
    ) {
      content
      message_created_at
      message_id
      receiver_id
      sender_id
      user_name
      user_profile_picture
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SendMessage(
    $message_content: String!
    $message_reciever: Int!
    $message_sender: Int!
  ) {
    send_message_to_user(
      args: {
        p_content: $message_content
        p_receiver_id: $message_reciever
        p_sender_id: $message_sender
      }
    ) {
      content
      created_at
      id
    }
  }
`;

const ChatContainer = () => {
  const navigate = useNavigate();
  const { currentUserId } = useChatContext();

  const { loading, error, data } = useQuery(GET_CURRENT_MESSAGES, {
    variables: {
      current_user: currentUserId
    },
    pollInterval: 500
  });

  const [sendMessage, { loading: isLoading, error: hasError, data: sentData }] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    if (!currentUserId) return navigate("/");
  }, []);

  if (!currentUserId || loading) return <p>Loading....</p>;

  if (error) return <p>Error : {error.message}</p>;

  return <ChatLayout messages={data.messages_with_user_data} sendMessage={sendMessage} />;
};

export default ChatContainer;
