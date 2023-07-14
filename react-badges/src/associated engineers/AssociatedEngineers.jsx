import React,{useContext, useEffect} from 'react';
import { gql, useMutation } from '@apollo/client';
import { AuthContext } from '../state/with-auth';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import ProposalButton from './ProposalButton';



const GET_ENGINEERS = gql`
  mutation GetEngineersByManager($managerId: Int!) {
    get_engineers_by_manager(args: { manager_id: $managerId }) {
      name
      roles
      id
    }
  }
`;


const AssociatedEngineers = () => {
    const {managerId}=useContext(AuthContext)
    console.log("managerid",typeof managerId);
  const [getEngineersByManager, {  loading, error, data }] = useMutation(GET_ENGINEERS, {
    variables: { managerId},
  });

  const handleProposalClick=(engineerId)=>{
    console.log("proposal corresponding for engineer with id: ", engineerId)
  }

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <h1 style={{ textAlign: 'center' }}>List of Engineers</h1>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Roles</TableCell>
          <TableCell>Add Proposal</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data && data.get_engineers_by_manager.map((engineer)=> (
          
          <TableRow key={engineer.id}>
            <TableCell>{engineer.name}</TableCell>
            <TableCell>{engineer.roles.join('/')}</TableCell>

            <TableCell>
              <ProposalButton onClick={()=>handleProposalClick(engineer.id)} id={engineer.id}/>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>


  );
};

export default AssociatedEngineers;
