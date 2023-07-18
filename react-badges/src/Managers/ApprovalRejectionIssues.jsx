import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../state/with-auth";
import { Button, TextField } from "@mui/material";
import {
  GET_ISSUING_REQUESTS,
  REJECT_ISSUING_REQUEST,
  APPROVE_ISSUING_REQUEST
} from "../state/queries-mutations.graphql";
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';

const ApprovalRejectionIssues = () => {
  const [showRejectionTextArea, setShowRejectionTextArea] = useState(false);
  const [rejectionDescription, setRejectionDescription] = useState("");
  const { managerId } = useContext(AuthContext);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [getExistingIssues, { loading, error, data }] = useMutation(
    GET_ISSUING_REQUESTS,
    { variables: { managerId } }
  );
  const [rejectIssuingRequest] = useMutation(REJECT_ISSUING_REQUEST);
  const [approveIssuingRequest] = useMutation(APPROVE_ISSUING_REQUEST);

  const handleApprovalClick = async (id) => {
    try {
      await approveIssuingRequest({
        variables: {
          id: id,
          isApproved: true,
          rejectionDescription: null
        }
      });
      console.log(`Engineer's id:`, id);
      getExistingIssues();
    } catch (error) {
      console.error("Error approving issuing request:", error);
    }
  };

  const handleRejectionClick = (id) => {
    setSelectedRequestId(id);
    setShowRejectionTextArea(true);
    console.log(`Engineer's id:`, id);
  };

  const handleDescriptionChange = (event) => {
    setRejectionDescription(event.target.value);
  };

  const handleRejectionSubmit = async () => {
    try {
      await rejectIssuingRequest({
        variables: {
          id: selectedRequestId,
          rejectionDescription: rejectionDescription
        }
      });
      console.log("Description:", rejectionDescription);
      setSelectedRequestId(null);
      setRejectionDescription("");
      setShowRejectionTextArea(false);
      getExistingIssues();
    } catch (error) {
      console.error("Error rejecting issuing request:", error);
    }
  };

  useEffect(() => {
    getExistingIssues();
  }, [getExistingIssues]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>Existing Issues</h2>
      {data && data.get_issuing_requests_for_manager.length === 0 ? (
      //    <Stack sx={{ width: '100%' }} spacing={2}>
      //    <Alert severity="info">No issues found!</Alert>
      //  </Stack>
      <p>No issues found</p>
      ) : (
        data &&
        data.get_issuing_requests_for_manager.map((issue) => (
          <div key={issue.id}>
            <h3>{issue.badge_title}</h3>
            <p>{issue.badge_description}</p>
            <p>
              <strong>Badge Version: </strong>
              {issue.badge_version}
            </p>
            <p>
              <strong>Engineer: </strong>
              {issue.engineer_name}
            </p>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleApprovalClick(issue.id)}
              sx={{ marginRight: "10px" }}
            >
              Approve
            </Button>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleRejectionClick(issue.id)}
              sx={{ backgroundColor: "red" }}
            >
              Reject
            </Button>

            {showRejectionTextArea && (
              <div>
                <TextField
                  value={rejectionDescription}
                  onChange={handleDescriptionChange}
                  placeholder="Enter rejection description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                />

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleRejectionSubmit}
                  sx={{ backgroundColor: "green" }}
                >
                  Submit
                </Button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ApprovalRejectionIssues;
