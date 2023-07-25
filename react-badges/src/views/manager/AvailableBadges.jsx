import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { styled } from "@mui/system";
import { GET_BADGES } from "../../state/queries-mutations.graphql";
import ButtonComponent from "../../components/ButtonComponent";

const BadgeList = () => {
  const [showAll, setShowAll] = useState(false);
  const { loading, error, data } = useQuery(GET_BADGES);
  console.log(data);

  const handleFilterClick = () => {
    setShowAll(!showAll);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const badges = showAll ? data.badges_versions : data.badges_versions_last;

  const StyledRoot = styled("div")({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center"
  });

  const StyledCard = styled(Card)({
    margin: "1rem",
    width: "390px",
    height: "400px",
    border: "3px solid #1976d2",
    borderRadius: "10px",
    boxShadow:
      "4px 6px 8px -4px rgba(25, 118, 210, 0.4), 2px 6px 7px 2px rgba(25, 118, 210, 0.16), 2px 3px 12px 2px rgba(25, 118, 210, 0.14)"
  });

  return (
    <div>
      <Typography variant="h2" align="center" padding="30px" fontFamily="monosp" fontWeight="bold" gutterBottom>
        Available Badges
      </Typography>
      <StyledRoot>
        {badges.map((badge, index) => (
          <StyledCard key={index}>
            <CardContent>
              <Typography display="flex" justifyContent="center" gutterBottom>
                <strong>{badge.title}</strong>
              </Typography>
              <Typography textAlign="justify" variant="body1" component="p" padding="20px">
                {badge.description}
              </Typography>
              <Typography marginLeft="50px" color="text.secondary">
                <strong>Version: </strong> {badge.created_at}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledRoot>
      <ButtonComponent
        sx={{
          marginLeft: "550px",
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem"
        }}
        content={showAll ? "Show Latest Badges" : "Show All Badges"}
        handleClick={handleFilterClick}
        variant="contained"
      />
    </div>
  );
};

export default BadgeList;
