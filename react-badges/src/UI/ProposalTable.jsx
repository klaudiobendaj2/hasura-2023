import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import ModalComponent from "./ModalComponent";

const ProposalTable = ({
  showPendingProposals,
  pendingProposals,
  handleOpen,
  handleClose,
  textAreaValue,
  getTextAreaValue,
  open,
  candidatures,
  onApproveClick,
  onDisapproveClick
}) => {
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
            <TableCell
              align="right"
              style={{ display: showPendingProposals ? "block" : "none" }}
            >
              Actions
            </TableCell>
            <TableCell
              align="right"
              style={{ display: showPendingProposals ? "none" : "block" }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {showPendingProposals &&
            pendingProposals.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 }
                }}
              >
                <TableCell component="th" scope="row">
                  {item.user.name}
                </TableCell>
                <TableCell align="right">{item.badge_version}</TableCell>
                <TableCell align="right">{item.badges_version.title}</TableCell>
                <TableCell align="right">{item.proposal_description}</TableCell>
                <TableCell align="right">{item.userByManager.name}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => onApproveClick(item.id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleOpen}
                  >
                    Reject
                  </Button>
                </TableCell>

                <ModalComponent
                  handleClose={handleClose}
                  textAreaValue={textAreaValue}
                  getTextAreaValue={getTextAreaValue}
                  open={open}
                  onDisapproveClick={onDisapproveClick}
                  itemId={item.id}
                />
              </TableRow>
            ))}
          {!showPendingProposals &&
            candidatures.map((item) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 }
                }}
              >
                <TableCell component="th" scope="row">
                  {item.user.name}
                </TableCell>
                <TableCell align="right">{item.badge_version}</TableCell>
                <TableCell align="right">{item.badges_version.title}</TableCell>
                <TableCell align="right">{item.proposal_description}</TableCell>
                <TableCell align="right">{item.userByManager.name}</TableCell>
                <TableCell align="right">
                  {item.manager_badge_candidature_proposal_responses.length >
                    0 &&
                    (item.manager_badge_candidature_proposal_responses[0]
                      .is_approved
                      ? "Proposal approved"
                      : "Proposal rejected")}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ProposalTable;
