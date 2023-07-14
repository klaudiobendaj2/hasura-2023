import React, { useState, useContext } from "react";
import { gql, useQuery } from "@apollo/client";
import { AuthContext } from "./state/with-auth";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";

const GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS = gql`
  query MyQuery {
    engineer_to_manager_badge_candidature_proposals {
      id
      created_by
      badge_version
      manager
      proposal_description
      badges_version {
        title
      }
      user {
        name
      }
      userByManager {
        name
      }
    }
  }
`;

const CandidatureProposals = () => {
  const { managerId } = useContext(AuthContext);
  const { loading, error, data } = useQuery(
    GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error...{error}</div>;
  }
  console.log(data);
  const candidatures = data.engineer_to_manager_badge_candidature_proposals;
  console.log(data.engineer_to_manager_badge_candidature_proposals);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Engineer who applied</TableCell>
            <TableCell align="right">Badge Version</TableCell>
            <TableCell align="right">Badge Title</TableCell>
            <TableCell align="right">Proposal Description</TableCell>
            <TableCell align="right">Manager</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {candidatures.map(
            (item) =>
              item.manager === parseInt(managerId) && (
                <TableRow
                  key={item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {item.user.name}
                  </TableCell>
                  <TableCell align="right">{item.badge_version}</TableCell>
                  <TableCell align="right">
                    {item.badges_version.title}
                  </TableCell>
                  <TableCell align="right">
                    {item.proposal_description}
                  </TableCell>
                  <TableCell align="right">{item.userByManager.name}</TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="success">
                      Approve
                    </Button>
                    <Button variant="contained" color="error">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CandidatureProposals;
