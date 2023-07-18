import React, { useContext,useState,useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { AuthContext } from '../../state/with-auth';
import { GET_BADGES_VERSIONS, INSERT_CANDIDATURE_PROPOSAL,GET_ENGINEERS } from '../../state/queries-mutations.graphql';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import Route404 from '../Route404';
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from '@mui/material';
import { useForm } from 'react-hook-form';

const AddCandidatureProposal = () => {
  const { managerId } = useContext(AuthContext);
  const { engineerId, engineerName } = useParams();
  const [selectedEngineer, setSelectedEngineer] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm({mode:"onChange"});
  const { loading: versionsLoading, error: versionsError, data: versionsData } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] = useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const [getEngineersByManager, { loading:engineersLoading, error: engineersError, data: engineersData }] = useMutation(GET_ENGINEERS, {
    variables: { managerId },
  });

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const navigate = useNavigate();
  
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);

  const handleFormSubmit = async (data) => {
    try {
      const selectedBadge = versionsData?.badges_versions_last.find((version) => version.id === parseInt(data.selectedBadgeVersion));
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;

      const engineerValue = selectedEngineer || engineerId;

      if (badgeId && badgeVersion && engineerId !== '' && managerId) {
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersion,
            engineer: parseInt(engineerValue),
            proposalDescription: data.proposalDescription,
            createdBy: managerId
          }
        });

        console.log('Candidature proposal added successfully!');
        console.log('Data:', {
          badgeId: Number(badgeId),
          badgeVersion: badgeVersion,
          engineer: engineerValue,
          proposalDescription: data.proposalDescription,
          createdBy: managerId
        });

        navigate('/managers/CandidatureProposals');
      } else {
        console.error('Failed to retrieve badge ID or badge version for the selected version.');
      }
    } catch (error) {
      console.error('Error adding candidature proposal:', error);
    }
  };

  if (!managerId) {
    return <Typography variant="body1">Manager ID not available.</Typography>;
  }

  if (versionsLoading || addLoading) {
    return <CircularProgress />;
  }

  if (versionsError || addError) {
    return (
      <Typography variant="body1">
        Error: {versionsError?.message || addError?.message}
      </Typography>
    );
  }
  const handleEngineerChange = (id) => {
    setSelectedEngineer(id);
    console.log(id);
  };

  console.log("statee: ", selectedEngineer);

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" style={{ margin: '50px', textAlign: 'center' }}>
        Add Candidature Proposal
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
        {pathname === '/managers/AddCandidatureProposal' ? (
            <Grid item xs={12}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="engineer-label">Select Engineer</InputLabel>
                <Select
                  id="engineer"
                  labelId="engineer-label"
                  value={selectedEngineer}
                  onChange={(e) => handleEngineerChange(e.target.value)}
                  label="Select Engineer"
                >
                  <MenuItem value="">None</MenuItem>
                  {engineersData?.get_engineers_by_manager.map((engineer) => (
                    <MenuItem key={engineer.id} value={engineer.id}>
                      {engineer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <TextField
                id="engineer"
                label="Engineer Name"
                variant="outlined"
                fullWidth
                value={decodeURIComponent(engineerName)}
                disabled
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth error={!!errors.selectedBadgeVersion}>
              <InputLabel id="badgeVersion-label">Select a Badge Version</InputLabel>
              <Select
                id="badgeVersion"
                labelId="badgeVersion-label"
                defaultValue=""
                label="Select a Badge Version"
                {...register('selectedBadgeVersion', { required: "Please select a badge version." })}
              >
                {versionsData?.badges_versions_last.map((version) => (
                  <MenuItem key={version.id} value={version.id}>
                    {version.title}
                  </MenuItem>
                ))}
              </Select>
              {errors.selectedBadgeVersion && (
                <FormHelperText error>{errors.selectedBadgeVersion.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="proposalDescription"
              label="Proposal Description"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              {...register('proposalDescription', { required: true })}
              error={!!errors.proposalDescription}
            />
            {errors.proposalDescription && (
              <FormHelperText error>Please enter a proposal description.</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCandidatureProposal;
