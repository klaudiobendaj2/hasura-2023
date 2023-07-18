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
                <strong>Created at: </strong> {badge.created_at}
              </Typography>
            </CardContent>
          </StyledCard>
        ))}
      </StyledRoot>
      <FilterButton showLatest={showLatest} onClick={handleFilterClick} />
    </div>
  );
};

export default BadgeList;
