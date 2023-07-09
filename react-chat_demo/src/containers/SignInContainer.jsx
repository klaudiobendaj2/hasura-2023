import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useChatContext } from "../state/withContext";
import SignInLayout from "../layouts/SignInLayout";

const SIGN_IN_MUTATION = gql`
  mutation SignInMutation($input_name: String!, $input_password: String!) {
    sign_in(
      args: { input_name: $input_name, input_password: $input_password }
    ) {
      id
      user_name
      user_password
    }
  }
`;

const SignInContainer = () => {
  const [signIn, { loading, error, data }] = useMutation(SIGN_IN_MUTATION);

  const navigate = useNavigate();

  const { setCurrentUserId } = useChatContext();

  const [credentials, setCredentials] = useState({
    input_name: "",
    input_password: ""
  });

  const handleSignIn = (inputCredentials) =>
    signIn({ variables: inputCredentials });

  if (loading) return <p>....LOADINGGGG</p>;

  if (error) return <p>Error : {error.message}</p>;

  if (data && Boolean(data.sign_in.length)) {
    setCurrentUserId(data.sign_in[0].id);
    navigate("/messages");
  }

  return (
    <SignInLayout
      handleSignIn={handleSignIn}
      setCredentials={setCredentials}
      credentials={credentials}
    />
  );
};

export default SignInContainer;
