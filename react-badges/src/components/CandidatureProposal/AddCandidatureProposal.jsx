import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import {
  GET_BADGES_VERSIONS,
  INSERT_CANDIDATURE_PROPOSAL,
  GET_ENGINEERS
} from "../../state/queries-mutations.graphql";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
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
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const AddCandidatureProposal = () => {
  const { managerId } = useContext(AuthContext);
  const { engineerId, engineerName } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control
  } = useForm({ mode: "onChange" });
  const {
    loading: versionsLoading,
    error: versionsError,
    data: versionsData
  } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] =
    useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const [
    getEngineersByManager,
    { loading: engineersLoading, error: engineersError, data: engineersData }
  ] = useMutation(GET_ENGINEERS, {
    variables: { managerId }
  });

  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const handleFormSubmit = async (data) => {
    try {
      const selectedBadge = versionsData?.badges_versions_last.find(
        (version) => version.id === parseInt(data.selectedBadgeVersion)
      );
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;

      const engineerValue = data.selectedEngineer || engineerId;
      const engineer = engineersData?.get_engineers_by_manager.find(
        (engineer) =>
          engineer.id === parseInt(engineerValue) &&
          engineer.name === engineerName
      );

      if (!engineer) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This engineer doesn't exist.",
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          setTimeout(() => {
            navigate("/managers/AssociatedEngineers");
          }, 200);
        });
        return;
      }

      if (badgeId && badgeVersion && engineerId !== "" && managerId) {
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersion,
            engineer: parseInt(engineerValue),
            proposalDescription: data.proposalDescription,
            createdBy: managerId
          }
        });
        console.log("Candidature proposal added successfully!");
        console.log("Data:", {
          badgeId: Number(badgeId),
          badgeVersion: badgeVersion,
          engineer: engineerValue,
          proposalDescription: data.proposalDescription,
          createdBy: managerId
        });
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Proposal sent successfully!",
          showConfirmButton: false,
          timer: 1500,
          customClass: {
            container: 'custom-swal-container'
          }
        }).then(() => {
          navigate("/managers/CandidatureProposals");
        });
      } else {
        console.error(
          "Failed to retrieve badge ID or badge version for the selected version."
        );
      }
    } catch (error) {
      console.error("Error adding candidature proposal:", error);
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

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height:"75vh",
        marginTop:"7vh",
        border: "3px solid #1976d2",
        borderRadius: "10px",
        boxShadow:
          "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)"
      }}
    >
      <Typography
        component="h1"
        variant="h5"
        style={{ margin: "50px", textAlign: "center" }}
      >
        Add Candidature Proposal
      </Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid container spacing={2}>
          {pathname === "/managers/AddCandidatureProposal" ? (
            <Grid item xs={12}>
              <FormControl
                variant="outlined"
                fullWidth
                error={!!errors.selectedEngineer}
              >
                <InputLabel id="engineer-label">Select Engineer</InputLabel>
                <Controller
                  name="selectedEngineer"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Please select an engineer." }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      labelId="engineer-label"
                      label="Select Engineer"
                    >
                      {engineersData?.get_engineers_by_manager.map(
                        (engineer) => (
                          <MenuItem key={engineer.id} value={engineer.id}>
                            {engineer.name}
                          </MenuItem>
                        )
                      )}
                    </Select>
                  )}
                />
                {errors.selectedEngineer && (
                  <FormHelperText error>
                    {errors.selectedEngineer.message}
                  </FormHelperText>
                )}
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
            <FormControl
              variant="outlined"
              fullWidth
              error={!!errors.selectedBadgeVersion}
            >
              <InputLabel id="badgeVersion-label">
                Select a Badge Version
              </InputLabel>
              <Controller
                name="selectedBadgeVersion"
                control={control}
                defaultValue=""
                rules={{ required: "Please select a badge version." }}
                render={({ field }) => (
                  <Select
                    {...field}
                    labelId="badgeVersion-label"
                    label="Select a Badge Version"
                  >
                    {versionsData?.badges_versions_last.map((version) => (
                      <MenuItem key={version.id} value={version.id}>
                        {version.title}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.selectedBadgeVersion && (
                <FormHelperText error>
                  {errors.selectedBadgeVersion.message}
                </FormHelperText>
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
              {...register("proposalDescription", {
                required: "Please enter a proposal description."
              })}
              error={!!errors.proposalDescription}
            />
            {errors.proposalDescription && (
              <FormHelperText error>
                {errors.proposalDescription.message}
              </FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sx={{marginTop:"3vh"}}>
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
