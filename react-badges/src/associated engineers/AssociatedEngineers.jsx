import React, { useContext, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../state/with-auth';
import { Table, TableHead, TableRow, TableCell, TableBody,Card,CardContent,Typography,Avatar,Grid } from '@mui/material';
import ProposalButton from './ProposalButton';
import { GET_ENGINEERS } from '../state/queries-mutations.graphql';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const AssociatedEngineers = () => {
  const { managerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const [getEngineersByManager, { loading, error, data }] = useMutation(GET_ENGINEERS, {
    variables: { managerId },
  });

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const handleProposalClick = (engineerId,engineerName) => {
    console.log('Proposal corresponding for engineer with id: ', engineerId , engineerName);
    navigate(`/managers/AddCandidatureProposal/${engineerId}/${encodeURIComponent(engineerName)}`);
  };
    const engineerImageMap = {
    1: '1.jpg',
    4: '4.jpg',
    7: '7.jpg',
    8: '8.jpg',
    }

  if (loading) return <Loader/>;

  if (error) return <p>Error: {error.message}</p>;

 return (
  <div>
    <h1 style={{ textAlign: "center" }}>List of Engineers</h1>
    <Grid container rowSpacing={1} columnSpacing={1}>
      {data && data.get_engineers_by_manager.map((engineer) => (
        <Grid item key={engineer.id} xs={12} sm={6}>
          <Card sx={{margin:"50px"}}>
            <CardContent sx={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
              <Avatar src={`../images/${engineerImageMap[engineer.id]}`} alt={engineer.name} sx={{ width: 100, height: 100, marginBottom: '50px' }} />
              <Typography variant="h5" component="h2" sx={{marginBottom:"10px"}}>
                {engineer.name}
              </Typography>
              <Typography color="textSecondary" sx={{ mb: 1,marginBottom:"10px" }}>
                Roles: {engineer.roles.join("/")}
              </Typography>
              <ProposalButton  onClick={() => handleProposalClick(engineer.id, engineer.name)} id={engineer.id}  />
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
);
};

export default AssociatedEngineers;
