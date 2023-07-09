import { useEffect } from "react";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../state/withContext";
import HomeLayout from "../layouts/HomeLayout";

const CURRENT_USER_MESSAGES = gql`
  query CurrentUserMessages($current_user_id: Int!) {
    messages_with_user_data(where: { receiver_id: { _eq: $current_user_id } }) {
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

const HomeContainer = () => {
  const navigate = useNavigate();
  const { currentUserId, setMessages } = useChatContext();

  const { loading, error, data } = useQuery(CURRENT_USER_MESSAGES, {
    variables: {
      current_user_id: currentUserId
    },
    pollInterval: 500
  });

  useEffect(() => {
    if (!currentUserId) return navigate("/");
  }, []);

  useEffect(() => {
    if (data && data.messages_with_user_data) {
      setMessages(data.messages_with_user_data);
    }
  }, [loading, data]);

  if (!currentUserId || loading) return <p>Loading....</p>;

  if (error) return <p>Error : {error.message}</p>;

  return <HomeLayout data={data} />;
};

export default HomeContainer;
