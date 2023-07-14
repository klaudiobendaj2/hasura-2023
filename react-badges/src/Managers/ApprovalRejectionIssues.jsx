
// import React, { useEffect, useState } from "react";
// import { useMutation, gql } from "@apollo/client";
// import { useContext } from "react";
// import { AuthContext } from "../state/with-auth";
// import { Button, TextField } from "@mui/material";

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

// const ApprovalRejectionIssues = () => {
//   const [showRejectionTextArea, setShowRejectionTextArea] = useState(false);
//   const [rejectionDescription, setRejectionDescription] = useState("");
//   const { managerId } = useContext(AuthContext);
//   const [getExistingIssues, { loading, error, data }] = useMutation(
//     GET_ISSUING_REQUESTS,
//     { variables: { managerId } }
//   );

//   console.log(data);

//   const handleRejectionClick = () => {
//     setShowRejectionTextArea(true);
//   };

//   const handleDescriptionChange = (event) => {
//     setRejectionDescription(event.target.value);
//   };

//   const handleApprovalClick = () => {
//     setShowRejectionTextArea(false);
//   };

//   const handleRejectionSubmit = () => {};

//   useEffect(() => {
//     getExistingIssues();
//   }, [getExistingIssues]);

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }

//   return (
//     <div>
//       <h2>Existing Issues</h2>
//       {data &&
//         data.get_issuing_requests_for_manager.map((issue) => (
//           <div key={issue.id}>
//             <h3>{issue.badge_title}</h3>
//             <p>{issue.badge_description}</p>
//             <p>
//               <strong>Badge Version: </strong>
//               {issue.badge_version}
//             </p>
//             <p>
//               <strong>Engineer: </strong>
//               {issue.engineer_name}
//             </p>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleApprovalClick}
//               sx={{ marginRight: "10px" }}
//             >
//               Approve
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={handleRejectionClick}
//               sx={{ backgroundColor: "red" }}
//             >
//               Reject
//             </Button>

//             {showRejectionTextArea && (
//               <div>
//                 <TextField
//                   value={rejectionDescription}
//                   onChange={handleDescriptionChange}
//                   placeholder="Enter rejection description"
//                   multiline
//                   rows={4}
//                   variant="outlined"
//                   fullWidth
//                 />

//                 <Button
//                   variant="contained"
//                   color="secondary"
//                   onClick={handleRejectionSubmit}
//                   sx={{ backgroundColor: "green" }}
//                 >
//                   Submit
//                 </Button>
//               </div>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// };

// export default ApprovalRejectionIssues;