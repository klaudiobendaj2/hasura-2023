import React, { useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import {
  GET_BADGES_VERSIONS,
  INSERT_CANDIDATURE_PROPOSAL,
  GET_ENGINEERS,
  GET_BADGE_CANDIDATURE_REQUESTS,
  GET_PENDING_PROPOSALS,
  GET_ENGINEERS_PENDING_PROPOSALS
} from "../../state/queries-mutations.graphql";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from "@mui/material";
import LoadableCurtain from "../../components/LoadableCurtain";
import { useForm, Controller } from "react-hook-form";
import CenteredLayout from "../../layouts/CenteredLayout";

const AddCandidatureProposal = () => {
  const { managerId } = useContext(AuthContext);
  const { engineerId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue
  } = useForm({ mode: "onChange" });
  const { loading: versionsLoading, error: versionsError, data: versionsData } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] = useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const [getEngineersByManager, { loading: engineersLoading, error: engineersError, data: engineersData }] = useMutation(
    GET_ENGINEERS,
    {
      variables: { managerId }
    }
  );
  const [getPendingProposals, { loading: pendingProposalsLoading, error: pendingProposalsError, data: pendingProposalsData }] =
    useMutation(GET_ENGINEERS_PENDING_PROPOSALS, {
      variables: {
        managerId: managerId
      }
    });

    const [getEngineersPendingProposals, { loading: engineersPendingProposalsLoading, error: engineersPendingProposalsError, data: engineersPendingProposalsData }] =
    useMutation(GET_PENDING_PROPOSALS, {
      variables: {
        managerId: managerId
      }
    }); 

  const {
    loading: candidatureLoading,
    error: candidatureError,
    data: candidatureRequestData
  } = useQuery(GET_BADGE_CANDIDATURE_REQUESTS, {
    variables: {
      managerId: managerId
    }
  });

  useEffect(() => {
    getEngineersByManager();
    getPendingProposals();
    getEngineersPendingProposals();
  }, [getEngineersByManager, getPendingProposals,getEngineersPendingProposals]);

  console.log("pending:",engineersPendingProposalsData);
  const navigate = useNavigate();

  const location = useLocation();

  const pathname = location.pathname;

  const [engineerExists, setEngineerExists] = useState(true);

  useEffect(() => {
    if (engineerId) {
      if (engineersData) {
        const validEngineer = engineersData.get_engineers_by_manager.find((engineer) => engineer.id === parseInt(engineerId));
        if (!validEngineer) {
          setEngineerExists(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "This engineer doesn't exist.",
            showConfirmButton: false,
            timer: 1500,
            customClass: {
              container: "custom-swal-container"
            }
          }).then(() => {
            navigate("/managers/AssociatedEngineers");
          });
        } else {
          setValue("engineerName", validEngineer.name);
          setEngineerExists(true);
        }
      }
    } else {
      setEngineerExists(true);
    }
  }, [engineerId, engineersData, setValue, pathname]);
  console.log("PENDINDDATA",pendingProposalsData);

  const handleFormSubmit = async (data) => {
    try {
      const selectedBadge = versionsData?.badges_versions_last.find(
        (version) => version.id === parseInt(data.selectedBadgeVersion)
      );
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;
      const engineerValue = data.selectedEngineer || parseInt(engineerId);


      const existingProposal = pendingProposalsData?.get_managers_pending_proposals_for_engineers.some(
        (proposal) => proposal.badge_version === badgeVersion && proposal.engineer === engineerValue
      );

      if (existingProposal) {
        console.error("There is already a pending proposal for this badge.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "There is already a pending proposal for this badge.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            container: "custom-swal-container"
          }
        })
      } else if (
        candidatureRequestData?.badge_candidature_request.some(
          (request) => request.badge_version === badgeVersion && request.engineer_id === engineerValue
        )
      ) {
        console.error("This proposal is accepted and ongoing.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "This proposal is accepted and ongoing.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            container: "custom-swal-container"
          }
        })
      } else if (
        engineersPendingProposalsData?.get_engineers_pending_proposals_for_managers.some(
          (proposal) => proposal.badge_version === badgeVersion && proposal.created_by === engineerValue
        )
      ) {
        console.error("The engineer has already applied for this badge.");
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "The engineer has already applied for this badge.",
          showConfirmButton: false,
          timer: 2000,
          customClass: {
            container: "custom-swal-container"
          }
        })
      } else {
        await addCandidatureProposal({
          variables: {
            badgeId: badgeId,
            badgeVersion: badgeVersion,
            engineer: engineerValue,
            proposalDescription: data.proposalDescription,
            createdBy: managerId
          }
        });
        console.log("Candidature proposal added successfully!");
        console.log("Data:", {
          badgeId: badgeId,
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
            container: "custom-swal-container"
          }
        }).then(() => {
          navigate("/managers/ManagerCandidatureProposals");
        });
      }
    } catch (error) {
      console.error("Error adding candidature proposal:", error);
    }
  };

  if (!managerId) {
    return <Typography variant="body1">Manager ID not available.</Typography>;
  }

  if (versionsLoading || addLoading || engineersLoading || candidatureLoading || pendingProposalsLoading || engineersPendingProposalsLoading) {
    return (
      <CenteredLayout>
        <LoadableCurtain text="Add Candidature Proposal" />
      </CenteredLayout>
    );
  }

  if (versionsError || addError || engineersError || pendingProposalsError || engineersPendingProposalsError || candidatureError ) {
    return <Typography variant="body1">Error: {versionsError?.message || addError?.message || engineersError?.message || pendingProposalsError?.message || engineersPendingProposalsError?.message || candidatureError?.message}</Typography>;
  }

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{
        height: "75vh",
        marginTop: "7vh",
        border: "3px solid #1976d2",
        borderRadius: "10px",
        boxShadow:
          "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)"
      }}
    >
      <Typography component="h1" variant="h5" style={{ margin: "50px", textAlign: "center", fontWeight: "bold" }}>
        Add Candidature Proposal
      </Typography>

      <Grid container spacing={2}>
        {engineerExists && pathname === "/managers/AddCandidatureProposal" ? (
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth error={!!errors.selectedEngineer}>
              <InputLabel id="engineer-label">Select Engineer</InputLabel>
              <Controller
                name="selectedEngineer"
                control={control}
                defaultValue=""
                rules={{ required: "Please select an engineer." }}
                render={({ field }) => (
                  <Select {...field} labelId="engineer-label" label="Select Engineer">
                    {engineersData?.get_engineers_by_manager.map((engineer) => (
                      <MenuItem key={engineer.id} value={engineer.id}>
                        {engineer.name}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.selectedEngineer && <FormHelperText error>{errors.selectedEngineer.message}</FormHelperText>}
            </FormControl>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <TextField
              id="engineer"
              label="Engineer Name"
              variant="outlined"
              fullWidth
              value={watch("engineerName") || ""}
              disabled
            />
          </Grid>
        )}

        <Grid item xs={12}>
          <FormControl variant="outlined" fullWidth error={!!errors.selectedBadgeVersion}>
            <InputLabel id="badgeVersion-label">Select a Badge Version</InputLabel>
            <Controller
              name="selectedBadgeVersion"
              control={control}
              defaultValue=""
              rules={{ required: "Please select a badge version." }}
              render={({ field }) => (
                <Select {...field} labelId="badgeVersion-label" label="Select a Badge Version">
                  {versionsData?.badges_versions_last.map((version) => (
                    <MenuItem key={version.id} value={version.id}>
                      {version.title}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.selectedBadgeVersion && <FormHelperText error>{errors.selectedBadgeVersion.message}</FormHelperText>}
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
          {errors.proposalDescription && <FormHelperText error>{errors.proposalDescription.message}</FormHelperText>}
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: "3vh" }}
            onClick={handleSubmit(handleFormSubmit)}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddCandidatureProposal;
