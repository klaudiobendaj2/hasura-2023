import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import { GET_CANDIDATURE_PROPOSALS_BY_MANAGER } from "../../state/queries-mutations.graphql";
import { Typography } from "@mui/material";
import ButtonComponent from "../../components/ButtonComponent";
import { useNavigate } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";
import CenteredLayout from "../../layouts/CenteredLayout";
import LoadableCurtain from "../../components/LoadableCurtain";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CancelIcon from "@mui/icons-material/Cancel";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import BlockIcon from "@mui/icons-material/Block";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const ManagerCandidatureProposals = () => {
  const { managerId } = useContext(AuthContext);
  const { loading, error, data, refetch } = useQuery(GET_CANDIDATURE_PROPOSALS_BY_MANAGER, {
    variables: {
      managerId: managerId
    }
  });
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const onButtonClick = () => {
    navigate("/managers/AddCandidatureProposal");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    refetch();
  }, [data]);

  if (loading) {
    return (
      <CenteredLayout>
        <LoadableCurtain text="Manager's Proposals" />
      </CenteredLayout>
    );
  }

  if (error) {
    return <div>Error</div>;
  }

  const candidatures = data.manager_to_engineer_badge_candidature_proposals;
  console.log(candidatures);

  return (
    <>
      <Typography variant="h2" align="center" padding="30px" fontFamily="monosp" fontWeight="bold" gutterBottom>
        Manager's Proposals
      </Typography>
      <Box sx={{ width: "90%", margin: "0 auto", position: "relative", marginTop: "20px" }}>
        <ButtonComponent
          variant="contained"
          handleClick={() => onButtonClick()}
          content="Create new proposal"
          sx={{
            position: "absolute",
            top: "-50px",
            right: 0,
            zIndex: 1
          }}
        />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Engineer</TableCell>
                <TableCell>Badge Version</TableCell>
                <TableCell>Proposal Description</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Disaproval Motivation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {candidatures.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item) => (
                <TableRow key={item.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {item.userByEngineer.name}
                  </TableCell>
                  <TableCell>{item.badge_version}</TableCell>
                  <TableCell>{item.proposal_description}</TableCell>
                  <TableCell>
                    {item.engineer_badge_candidature_proposal_responses.length > 0 ? (
                      item.engineer_badge_candidature_proposal_responses[0].is_approved ? (
                        <Stack>
                          <Chip label="Approved" color="success" variant="outlined" />
                        </Stack>
                      ) : (
                        <Stack>
                          <Chip label="Disapproved" color="error" variant="outlined" />
                        </Stack>
                      )
                    ) : (
                      <Stack>
                        <Chip label="Pending" color="warning" variant="outlined" />
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>
                    {item.engineer_badge_candidature_proposal_responses.length > 0 ? (
                      item.engineer_badge_candidature_proposal_responses[0].is_approved ? (
                        <BlockIcon fontSize="medium" />
                      ) : (
                        item.engineer_badge_candidature_proposal_responses[0].disapproval_motivation
                      )
                    ) : (
                      <BlockIcon fontSize="medium" />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={candidatures.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default ManagerCandidatureProposals;
