import React, { useContext, useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { AuthContext } from "../../state/with-auth";
import { Button } from "@mui/material";
import {
  GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS,
  APPROVE_DISAPPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER,
  GET_ENGINEERS_PENDING_PROPOSALS
} from "../../state/queries-mutations.graphql";
import ProposalTable from "../../UI/ProposalTable";

const CandidatureProposals = () => {
  const [open, setOpen] = useState(false);
  const [showPendingProposals, setShowPendingProposals] = useState(true);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [isApprovedFilter, setIsApprovedFilter] = useState(true);
  const [isApprovedValue, setIsApprovedValue] = useState(true);
  const currentTimestamp = new Date().toISOString();

  const { managerId } = useContext(AuthContext);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleShowPending = () => {
    setShowPendingProposals(true);
  };

  const { loading, error, data, refetch } = useQuery(
    GET_CANDIDATURE_PROPOSALS_BY_ENGINEERS,
    {
      variables: {
        isApproved: isApprovedFilter,
        managerId: managerId
      }
      // fetchPolicy: "network-only"
    }
  );

  const [
    getPendingProposals,
    { loading: pendingLoading, error: pendingError, data: pendingData }
  ] = useMutation(GET_ENGINEERS_PENDING_PROPOSALS, {
    variables: {
      managerId: managerId
    }
  });

  const [managerResponse, { data: data2, loading: loading2, error: error2 }] =
    useMutation(APPROVE_DISAPPROVE_ENGINEER_CANDIDATURE_PROPOSAL_BY_MANAGER);

  useEffect(() => {
    getPendingProposals();
  }, [showPendingProposals]);

  useEffect(() => {
    refetch({ isApproved: isApprovedFilter });
  }, [isApprovedFilter, showPendingProposals]);

  const onApproveClick = async (proposalId) => {
    await managerResponse({
      variables: {
        proposal_id: proposalId,
        is_approved: true,
        disapproval_motivation: null,
        created_by: managerId,
        created_at: currentTimestamp
      }
    });
    setTextAreaValue("");
    await getPendingProposals();
  };

  const onDisapproveClick = async (proposalId) => {
    await managerResponse({
      variables: {
        proposal_id: proposalId,
        is_approved: false,
        disapproval_motivation: textAreaValue,
        created_by: managerId,
        created_at: currentTimestamp
      }
    });
    setTextAreaValue("");
    await getPendingProposals();
  };

  const getTextAreaValue = (item) => {
    setTextAreaValue(item);
  };

  const handleShowOngoing = async () => {
    setIsApprovedFilter(true);
    // await refetch({ isApproved: isApprovedFilter });
    setShowPendingProposals(false);
  };

  const handleShowDisapproved = async () => {
    setIsApprovedFilter(false);
    // await refetch({ isApproved: isApprovedFilter });
    setShowPendingProposals(false);
  };

  if (loading) return <div>Loading...</div>;

  if (pendingLoading) return <div>Loading</div>;

  if (loading2) return <div>Loading...</div>;

  if (error) return <div>Error...{error}</div>;

  if (pendingError) return <div>Error...{error}</div>;

  if (error2) return <div>Error...{error}</div>;

  const candidatures =
    data?.engineer_to_manager_badge_candidature_proposals || [];
  const pendingProposals =
    pendingData?.get_engineers_pending_proposals_for_managers || [];

  return (
    <>
      <Button onClick={handleShowPending}>Show Pending Proposals</Button>
      <Button onClick={handleShowOngoing}>Show Ongoing</Button>
      <Button onClick={handleShowDisapproved}>Show Disapproved</Button>
      <ProposalTable
        showPendingProposals={showPendingProposals}
        pendingProposals={pendingProposals}
        handleOpen={handleOpen}
        handleClose={handleClose}
        textAreaValue={textAreaValue}
        getTextAreaValue={getTextAreaValue}
        open={open}
        candidatures={candidatures}
        onApproveClick={onApproveClick}
        onDisapproveClick={onDisapproveClick}
      />
    </>
  );
};
export default CandidatureProposals;
