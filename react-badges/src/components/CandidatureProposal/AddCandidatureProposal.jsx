import React, { useContext, useEffect,useState } from "react";
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
  Container,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid
} from "@mui/material";
import LoadableCurtain from "../LoadableCurtain";
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

  const [engineerExists, setEngineerExists] = useState(true);

  useEffect(() => {
    if (engineerId) {
      if (engineersData) {
        const validEngineer = engineersData.get_engineers_by_manager.find(
          (engineer) => engineer.id === parseInt(engineerId)
        );
        if (!validEngineer) {
          setEngineerExists(false);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "This engineer doesn't exist.",
            showConfirmButton: false,
            timer: 1500
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
  }, [engineerId, engineersData, setValue,pathname]);

  const handleFormSubmit = async (data) => {
    try {
      const selectedBadge = versionsData?.badges_versions_last.find(
        (version) => version.id === parseInt(data.selectedBadgeVersion)
      );
      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;
      const engineerValue = data.selectedEngineer || parseInt(engineerId);
    
      if (
        badgeId &&
        badgeVersion &&
        engineerValue &&
        managerId &&
        proposalDescription
      ) {
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
          timer: 1500
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

  if (versionsLoading || addLoading || engineersLoading) {
    return (
      <CenteredLayout>
        <LoadableCurtain text="Add Candidature Proposal" />
      </CenteredLayout>
    );
  }

  if (versionsError || addError) {
    return (
      <Typography variant="body1">
        Error: {versionsError?.message || addError?.message}
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <Typography
        component="h1"
        variant="h5"
        style={{ margin: "50px", textAlign: "center" }}
      >
        Add Candidature Proposal
      </Typography>
      <Grid container spacing={2}>
        {engineerExists && pathname === "/managers/AddCandidatureProposal" ? (
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
                    {engineersData?.get_engineers_by_manager.map((engineer) => (
                      <MenuItem key={engineer.id} value={engineer.id}>
                        {engineer.name}
                      </MenuItem>
                    ))}
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
              value={watch("engineerName") || ""}
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
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
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
