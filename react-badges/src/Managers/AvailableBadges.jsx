<<<<<<< HEAD
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/system';
=======
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { Button, Typography, Card, CardContent } from "@mui/material";

>>>>>>> main

const GET_BADGES = gql`
  query MyQuery {
    badges_versions {
      title
      description
      created_at
    }
    badges_versions_last {
      title
      description
      created_at
    }
  }
`;

const FilterButton = ({ showLatest, onClick }) => {
  return (
    <div  style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
      <Button onClick={onClick} variant="contained" >
        {showLatest ? 'Show All Badges' : 'Show Latest Badges'}
      </Button>
    </div>
  );
};

const StyledRoot = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
});

const StyledCard = styled(Card)({
  width: '300px',
  margin: '1rem',
});

const BadgeList = () => {
  const [showLatest, setShowLatest] = useState(false);

  const { loading, error, data } = useQuery(GET_BADGES);
  console.log(data);

<<<<<<< HEAD
=======
  const handleClickIssue = () => {
    // navigate("/dashboard/issues");
  };

>>>>>>> main
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
<<<<<<< HEAD
      <Typography variant="h2" align="center" gutterBottom>
        Available Badges
      </Typography>
      <StyledRoot >
        {badges.map((badge, index) => ( 
          <StyledCard key={index} >
            <CardContent>
              <Typography  display= 'flex' justifyContent= 'center' variant="h5" component="h3" gutterBottom>
                <strong>{badge.title}</strong>
              </Typography>
              <Typography textAlign="justify" variant="body1" component="p">
                {badge.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Created at:</strong> {badge.created_at}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledRoot>
      <FilterButton showLatest={showLatest} onClick={handleFilterClick} />
=======
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
>>>>>>> main
    </div>
  );
};

export default BadgeList;
