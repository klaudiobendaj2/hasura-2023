import React, { useContext, useEffect, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { AuthContext } from "../state/with-auth";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@mui/material";
import ProposalButton from "./ProposalButton";
import AddCandidatureProposal from "../components/CandidatureProposal/AddCandidatureProposal";
import { GET_ENGINEERS } from "../state/queries-mutations.graphql";

const AssociatedEngineers = () => {
  const { managerId } = useContext(AuthContext);
  console.log("managerid", typeof managerId);
  const [getEngineersByManager, { loading, error, data }] = useMutation(
    GET_ENGINEERS,
    {
      variables: { managerId }
    }
  );
  const [selectedEngineer, setSelectedEngineer] = useState(null);
  useEffect(() => {
    getEngineersByManager();
  }, [getEngineersByManager]);

  const handleProposalClick = (engineerId, engineerName) => {
    console.log("proposal corresponding for engineer with id: ", engineerId);
    setSelectedEngineer({ id: engineerId, name: engineerName });
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (selectedEngineer) {
    return <AddCandidatureProposal selectedEngineer={selectedEngineer} />;
  }

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of Engineers</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Roles</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.get_engineers_by_manager.map((engineer) => (
              <TableRow key={engineer.id}>
                <TableCell>{engineer.name}</TableCell>
                <TableCell>{engineer.roles.join("/")}</TableCell>
                <TableCell>
                  <ProposalButton
                    onClick={() =>
                      handleProposalClick(engineer.id, engineer.name)
                    }
                    id={engineer.id}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AssociatedEngineers;
