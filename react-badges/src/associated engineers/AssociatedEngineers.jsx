import React,{useContext} from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../state/with-auth';


const GET_ENGINEERS = gql`
  mutation GetEngineersByManager($managerId: Int!) {
    get_engineers_by_manager(args: { manager_id: $managerId }) {
      name
      roles
    }
  }
`;

const AssociatedEngineers = () => {
    const {managerId}=useContext(AuthContext)
    console.log("magerid",managerId)
  const [getEngineersByManager, {  loading, error, data }] = useMutation(GET_ENGINEERS, {
    variables: { managerId },
  });



  React.useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>List of Engineers</h1>
      <ul>
        {data && data.get_engineers_by_manager.map((engineer) => (
          <li key={engineer.name}>
            <strong>Name:</strong> {engineer.name}
            <br />
            <strong>Roles:</strong> {engineer.roles}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssociatedEngineers;
