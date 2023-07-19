import React, { useEffect, useState } from "react";

import { useMutation, gql } from "@apollo/client";

import { useContext } from "react";

import { AuthContext } from "../state/with-auth";

import { Button, TextField } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  GET_ISSUING_REQUESTS,
  REJECT_ISSUING_REQUEST,
  APPROVE_ISSUING_REQUEST
} from "../state/queries-mutations.graphql";




const ApprovalRejectionIssues = () => {
  const { managerId } = useContext(AuthContext);
  const [issueRequests, setIssueRequests] = useState([]);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [rejectionDescription, setRejectionDescription] = useState("");
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
      alert('The issue request was approved!');
      const updatedIssueRequests = issueRequests.map((issue) => {
        if (issue.id === id) {
          return { ...issue, showRejectionTextArea: false };
        }
        return issue;
      });
      setIssueRequests(updatedIssueRequests);
    } catch (error) {

      console.error("Error approving issuing request:", error);

    }

  };
  




  const handleRejectionClick = (id) => {

    setSelectedRequestId(id);
    setRejectionDescription("");
    const updatedIssueRequests = issueRequests.map((issue) => {
      if (issue.id === id) {
        return { ...issue, showRejectionTextArea: true };
      }
      return issue;
    });
    setIssueRequests(updatedIssueRequests);
  };




  const handleDescriptionChange = (event) => {

    setRejectionDescription(event.target.value);

  };




  const handleRejectionSubmit = async () => {
    alert("The issue request was not approved!");
    try {

      await rejectIssuingRequest({

        variables: {

          id: selectedRequestId,

          rejectionDescription: rejectionDescription

        }

      });

      setSelectedRequestId(null);

      setRejectionDescription("");
      const updatedIssueRequests = issueRequests.map((issue) => {
        if (issue.id === selectedRequestId) {
          return { ...issue, showRejectionTextArea: false };
        }
        return issue;
      });
      setIssueRequests(updatedIssueRequests);
      getExistingIssues();

    } catch (error) {

      console.error("Error rejecting issuing request:", error);

    }

  };




  useEffect(() => {

    getExistingIssues();

  }, [getExistingIssues]);

  useEffect(() => {
    if (data && data.get_issuing_requests_for_manager) {
      const updatedIssueRequests = data.get_issuing_requests_for_manager.map(
        (issue) => ({
          ...issue,
          showRejectionTextArea: false
        })
      );
      setIssueRequests(updatedIssueRequests);
    }
  }, [data]);

  if (loading) {

    return <p>Loading...</p>;

  }




  if (error) {

    return <p>Error: {error.message}</p>;

  }




  return (

    <div>
      <Typography variant="h2" align="center" gutterBottom>
        Existing Issues
      </Typography>
      {issueRequests.length === 0 ? (
        <Alert severity="info">
          <AlertTitle>Info</AlertTitle>
          <strong>No issue requests found!</strong>
        </Alert>
      ) : (
        issueRequests.map((issue) => (
          <Card
            key={issue.id}
            variant="outlined"
            sx={{
              marginBottom: "10px",
              width: "677px",
              marginLeft: "280px",
              height: issue.showRejectionTextArea ? "550px" : "350px",
              backgroundColor: " #F1F6F9"
            }}
          >
            <CardContent>
              <Typography
                display="flex"
                justifyContent="center"
                variant="h5"
                component="h3"
                gutterBottom
              >
                <strong>{issue.badge_title}</strong>
              </Typography>
              <Typography textAlign="justify" variant="body1" component="p">
                {issue.badge_description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Badge Version: </strong>
                {issue.badge_version}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Engineer: </strong>
                {issue.engineer_name}
              </Typography>
            </CardContent>
            <div className="issuebuttons">
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
              >
                Reject
              </Button>
            </div>
            {issue.showRejectionTextArea && (
              <CardContent>
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
                >

                  Submit

                </Button>
              </CardContent>
            )}
          </Card>
        ))
      )}
    </div>

  );

};




export default ApprovalRejectionIssues;