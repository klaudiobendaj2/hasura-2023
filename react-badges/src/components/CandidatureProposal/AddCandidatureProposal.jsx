import React, { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import { GET_BADGES_VERSIONS } from "./queries";
import { INSERT_CANDIDATURE_PROPOSAL } from "./mutations";
import { useNavigate } from "react-router-dom";
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
  Grid
} from "@mui/material";

const AddCandidatureProposal = ({ selectedEngineer }) => {
  const { managerId } = useContext(AuthContext);
  const [selectedBadgeVersion, setSelectedBadgeVersion] = useState("");
  const [proposalDescription, setProposalDescription] = useState("");
  const {
    loading: versionsLoading,
    error: versionsError,
    data: versionsData
  } = useQuery(GET_BADGES_VERSIONS);
  const [addCandidatureProposal, { loading: addLoading, error: addError }] =
    useMutation(INSERT_CANDIDATURE_PROPOSAL);
  const navigate = useNavigate();

  const handleBadgeVersionSelection = (event) => {
    setSelectedBadgeVersion(event.target.value);
  };

  const handleProposalDescriptionChange = (event) => {
    setProposalDescription(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const selectedBadge = versionsData?.badges_versions_last.find(
        (version) => version.id === parseInt(selectedBadgeVersion)
      );

      const badgeId = selectedBadge?.id;
      const badgeVersion = selectedBadge?.created_at;

      if (badgeId && badgeVersion && selectedEngineer !== "" && managerId) {
        await addCandidatureProposal({
          variables: {
            badgeId: Number(badgeId),
            badgeVersion: badgeVersion,
            engineer: parseInt(selectedEngineer.id),
            proposalDescription,
            createdBy: managerId
          }
        });

        setSelectedBadgeVersion("");
        setProposalDescription("");

        console.log("Candidature proposal added successfully!");
        console.log("Data:", {
          badgeId: Number(badgeId),
          badgeVersion: badgeVersion,
          engineer: parseInt(selectedEngineer.id),
          proposalDescription,
          createdBy: managerId
        });
        navigate("/managers/CandidatureProposals");
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
    <Container component="main" maxWidth="xs">
      <Typography
        component="h1"
        variant="h5"
        style={{ marginBottom: "16px", textAlign: "center" }}
      >
        Add Candidature Proposal
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id="engineer"
              label="Engineer Name"
              variant="outlined"
              fullWidth
              value={selectedEngineer ? selectedEngineer.name : ""}
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel id="badgeVersion-label">
                Select a Badge Version
              </InputLabel>
              <Select
                id="badgeVersion"
                labelId="badgeVersion-label"
                value={selectedBadgeVersion}
                onChange={handleBadgeVersionSelection}
                label="Select a Badge Version"
              >
                <MenuItem value="">None</MenuItem>
                {versionsData?.badges_versions_last.map((version) => (
                  <MenuItem key={version.id} value={version.id}>
                    {version.title}
                  </MenuItem>
                ))}
              </Select>
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
              value={proposalDescription}
              onChange={handleProposalDescriptionChange}
            />
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
