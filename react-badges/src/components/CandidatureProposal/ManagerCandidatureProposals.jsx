import React, { useEffect, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const GET_CANDIDATURE_PROPOSALS = gql`
  query {
    manager_to_engineer_badge_candidature_proposals {
      badge_version
      created_by
      created_at
      engineer
      id
      proposal_description
      engineer_badge_candidature_proposal_responses {
        disapproval_motivation
        is_approved
      }
    }
  }
`;

const ManagerCandidatureProposals = () => {
  const { managerId } = useContext(AuthContext);
  console.log(typeof managerId);
  const { loading, error, data } = useQuery(GET_CANDIDATURE_PROPOSALS);
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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Badge Version</TableCell>
              <TableCell align="right">Engineer</TableCell>
              <TableCell align="right">Proposal Description</TableCell>
              <TableCell align="right">Created By</TableCell>
              <TableCell align="right">Disaproval Motivation</TableCell>
              <TableCell align="right">Is Approved</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidatures.map(
              (item) =>
                item.created_by === parseInt(managerId) && (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.badge_version}
                    </TableCell>
                    <TableCell align="right">{item.engineer}</TableCell>
                    <TableCell align="right">
                      {item.proposal_description}
                    </TableCell>
                    <TableCell align="right">{item.created_by}</TableCell>
                    <TableCell align="right">
                      {item.userByManager.name}
                    </TableCell>
                    {item.engineer_badge_candidature_proposal_responses.map(
                      (item, index) => (
                        <React.Fragment key={index}>
                          <TableCell align="right">
                            {item.disapproval_motivation ? "Yes" : "No"}
                          </TableCell>
                          <TableCell align="right">
                            {item.is_approved ? "Yes" : "No"}
                          </TableCell>
                        </React.Fragment>
                      )
                    )}
                  </TableRow>
                )
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default ManagerCandidatureProposals;
