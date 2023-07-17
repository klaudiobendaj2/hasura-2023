
import React, { useEffect, useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useContext } from "react";
import { AuthContext } from "../state/with-auth";
import { Button, TextField } from "@mui/material";

const GET_ISSUING_REQUESTS = gql`
  mutation MyMutation($managerId: Int!) {
    get_issuing_requests_for_manager(args: { managerid: $managerId }) {
      badge_id
      badge_title
      candidature_evidences
      engineer_id
      engineer_name
      id
      is_issued
      manager_id
      badge_description
      badge_version
      created_at
    }
  }
`;
const UPDATE_ISSUING_REQUEST_REJECT = gql`
  mutation RejectIssuingRequest($requestId: Int!) {
    update_issuing_requests(
      where: { id: { _eq: $requestId } }
      _set: { disapproval_motivation: "nuk u pranua", is_approved: false }
    ) {
      returning {
        id
        disapproval_motivation
        is_approved
        request_id
      }
    }
  }
`;

  



const ApprovalRejectionIssues = () => {
  const [showRejectionTextArea, setShowRejectionTextArea] = useState(false);
  const [rejectionDescription, setRejectionDescription] = useState("");
  const { managerId } = useContext(AuthContext);
  const [getExistingIssues, { loading, error, data }] = useMutation(
    GET_ISSUING_REQUESTS,
    { variables: { managerId } }
  );
const [rejectIssuingRequest,{rejection}] = useMutation(UPDATE_ISSUING_REQUEST_REJECT);
  console.log("rejection",rejection);

  const handleRejectionClick = () => {
    setShowRejectionTextArea(true);
  };

  const handleDescriptionChange = (event) => {
    setRejectionDescription(event.target.value);
  };

  const handleApprovalClick = () => {
    setShowRejectionTextArea(false);
  };

  const handleRejectionSubmit = async () => {
    try {
      await rejectIssuingRequest({
        variables: { requestId: parseInt("your-request-id-here") },
      });
      setRejectionDescription("");
      setShowRejectionTextArea(false);
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
      {data &&
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
              onClick={handleApprovalClick}
              sx={{ marginRight: "10px" }}
            >
              Approve
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleRejectionClick}
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
        ))}
    </div>
  );
};

export default ApprovalRejectionIssues;



// import React from 'react';
// import { useMutation, useQuery, gql } from '@apollo/client';

// const GET_ISSUING_REQUESTS = gql`
//   mutation MyMutation($managerId: Int!) {
//     get_issuing_requests_for_manager(args: { managerid: $managerId }) {
//       badge_id
//       badge_title
//       candidature_evidences
//       engineer_id
//       engineer_name
//       id
//       is_issued
//       manager_id
//       badge_description
//       badge_version
//       created_at
//     }
//   }
// `;

// const APPROVE_ISSUING_REQUEST = gql`
//   mutation ApproveIssuingRequest($requestId: ID!) {
//     approve_issuing_request(id: $requestId) {
//       id
//     }
//   }
// `;

// const REJECT_ISSUING_REQUEST = gql`
//   mutation RejectIssuingRequest($requestId: ID!, $rejectionReason: String!) {
//     reject_issuing_request(id: $requestId, reason: $rejectionReason) {
//       id
//     }
//   }
// `;

// function IssuingRequests({ managerId }) {
//   const { loading, error, data } = useMutation(GET_ISSUING_REQUESTS, {
//     variables: { managerId },
//   });

//   const [approveRequest] = useMutation(APPROVE_ISSUING_REQUEST);
//   const [rejectRequest] = useMutation(REJECT_ISSUING_REQUEST);

//   const handleApprove = (requestId) => {
//     approveRequest({
//       variables: { requestId },
//       // Perform any necessary UI updates or show a success message
//     });
//   };

//   const handleReject = (requestId) => {
//     const reason = prompt('Enter reason for rejection:');
//     if (reason) {
//       rejectRequest({
//         variables: { requestId, rejectionReason: reason },
//         // Perform any necessary UI updates or show a success message
//       });
//     }
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;
//   if (!data || !data.get_issuing_requests_for_manager)
//     return <p>No issuing requests found.</p>;

//   return (
//     <div>
//       <h2>Issuing Requests</h2>
//       {data.get_issuing_requests_for_manager.map((request) => (
//         <div key={request.id}>
//           <h3>{request.badge_title}</h3>
//           <p>{request.badge_description}</p>
//           <p>Engineer: {request.engineer_name}</p>
//           <p>Created At: {request.created_at}</p>
//           {!request.is_issued && (
//             <div>
//               <button onClick={() => handleApprove(request.id)}>Approve</button>
//               <button onClick={() => handleReject(request.id)}>Reject</button>
//             </div>
//           )}
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default IssuingRequests;

