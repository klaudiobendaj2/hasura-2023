import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
import {GET_BADGES} from "../state/queries-mutations.graphql";


const FilterButton = ({ showLatest, onClick }) => {
  return (
    <button onClick={onClick}>
      {showLatest ? "Show All Badges" : "Show Latest Badges"}
    </button>
  );
};

const BadgeList = () => {
  const [showLatest, setShowLatest] = useState(false);
  // const navigate = useNavigate();

  const { loading, error, data } = useQuery(GET_BADGES);
  console.log(data);

  const handleClickIssue = () => {
    // navigate("/dashboard/issues");
  };

  const handleFilterClick = () => {
    setShowLatest(!showLatest);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const badges = showLatest ? data.badges_versions_last : data.badges_versions;

  return (
    <div>
      <Typography variant="h2">Available Badges</Typography>
      <div>
        <Button variant="contained" color="primary" onClick={handleClickIssue}>
          Go To Existing Issues
        </Button>
      </div>
      <FilterButton showLatest={showLatest} onClick={handleFilterClick} />
      <div
        style={{
          display: "flex",
          justifyContent: showLatest ? "flex-start" : "space-between",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        {badges.map((badge, index) => (
          <Card key={index} style={{ width: "30%" }}>
            <CardContent>
              <Typography variant="h3">{badge.title}</Typography>
              <Typography variant="body1">{badge.description}</Typography>
              <Typography variant="body2">
                <strong>Created at:</strong> {badge.created_at}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BadgeList;
