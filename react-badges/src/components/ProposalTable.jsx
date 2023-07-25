import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from "@mui/material";
import ModalComponent from "./ModalComponent";
import ButtonComponent from "./ButtonComponent";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import TableRowComponent from "./TableRowComponent";
import { useState } from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const ProposalTable = ({
  showPendingProposals,
  pendingProposals,
  textAreaValue,
  getTextAreaValue,
  candidatures,
  onApproveClick,
  onDisapproveClick
}) => {
  const [open, setOpen] = useState(false);
  const hasApprovedCandidature = candidatures.map(
    (candidature) => candidature.manager_badge_candidature_proposal_responses[0]?.is_approved
  );
  const areAllCandidaturesApproved = hasApprovedCandidature.every((isApproved) => isApproved === false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicants</TableCell>
              <TableCell>Badge Version</TableCell>
              <TableCell>Badge Title</TableCell>
              <TableCell>Proposal Description</TableCell>
              <TableCell align={showPendingProposals ? "center" : "left"}>
                {showPendingProposals ? "Actions" : "Status"}
              </TableCell>
              {!showPendingProposals && areAllCandidaturesApproved && <TableCell>Disapproval Motivation</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {showPendingProposals &&
              pendingProposals.map((item) => (
                <TableRowComponent
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                  component="th"
                  scope="row"
                  align="left"
                  item={item}
                  additionalCell={
                    <>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "51px" }}>
                          <ButtonComponent
                            variant="contained"
                            color="success"
                            handleClick={() => onApproveClick(item.id)}
                            content={<DoneOutlinedIcon />}
                            sx={{ marginRight: "10px" }}
                          />
                          <ButtonComponent
                            variant="contained"
                            color="error"
                            handleClick={() => handleOpen(item.id)}
                            content={<CloseOutlinedIcon />}
                          />
                        </Box>
                      </TableCell>
                      <ModalComponent
                        handleClose={handleClose}
                        textAreaValue={textAreaValue}
                        getTextAreaValue={getTextAreaValue}
                        open={open}
                        onDisapproveClick={onDisapproveClick}
                        itemId={item.id}
                      />
                    </>
                  }
                />
              ))}
            {!showPendingProposals &&
              candidatures.map((item) => (
                <TableRowComponent
                  key={item.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 }
                  }}
                  component="th"
                  scope="row"
                  item={item}
                  additionalCell={
                    <>
                      <TableCell>
                        {item.manager_badge_candidature_proposal_responses.length > 0 &&
                          (item.manager_badge_candidature_proposal_responses[0].is_approved ? (
                            <Stack direction="row" spacing={1}>
                              <Chip label="Approved" color="success" />
                            </Stack>
                          ) : (
                            <Stack direction="row" spacing={1}>
                              <Chip label="Rejected" />
                            </Stack>
                          ))}
                      </TableCell>
                      {item.manager_badge_candidature_proposal_responses.length > 0 &&
                      item.manager_badge_candidature_proposal_responses[0].is_approved ? null : (
                        <TableCell>{item.manager_badge_candidature_proposal_responses[0].disapproval_motivation}</TableCell>
                      )}
                    </>
                  }
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default ProposalTable;
