import SignInLayout from "../layouts/SignInLayout";
import { useQuery, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      password
      username
    }
  }
`;

const SignInContainer = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>....LOADINGGGG</p>;

  if (error) return <p>Error : {error.message}</p>;

  console.log(data);

  return <SignInLayout />;
};

export default SignInContainer;
