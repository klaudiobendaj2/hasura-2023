import React, { useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { GET_CANDIDATURE_PROPOSALS_BY_MANAGER } from "../../state/queries-mutations.graphql";
import { Typography } from "@mui/material";

const ManagerCandidatureProposals = () => {
  const { managerId } = useContext(AuthContext);
  console.log(typeof managerId);
  const { loading, error, data } = useQuery(
    GET_CANDIDATURE_PROPOSALS_BY_MANAGER,
    {
      variables: {
        managerId: managerId
      }
    }
  );
  useEffect(() => {
    // if(data){
    console.log(data);
    // }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  const candidatures = data.manager_to_engineer_badge_candidature_proposals;
  console.log(candidatures);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        Manager's Proposals
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Badge Version</TableCell>
              <TableCell align="right">Engineer</TableCell>
              <TableCell align="right">Proposal Description</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Disaproval Motivation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatures.map((item) => (
              <TableRow
                key={item.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.badge_version}
                </TableCell>
                <TableCell align="right">{item.userByEngineer.name}</TableCell>
                <TableCell align="right">{item.proposal_description}</TableCell>
                <TableCell align="right">{item.created_by}</TableCell>
                <TableCell align="right">
                  {item.engineer_badge_candidature_proposal_responses.length > 0
                    ? item.engineer_badge_candidature_proposal_responses[0]
                        .is_approved
                      ? "Yes"
                      : "No"
                    : "Pending"}
                </TableCell>
                <TableCell align="right">
                  {item.engineer_badge_candidature_proposal_responses.length > 0
                    ? item.engineer_badge_candidature_proposal_responses[0]
                        .disapproval_motivation
                      ? "Yes"
                      : "No"
                    : "---"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManagerCandidatureProposals;
