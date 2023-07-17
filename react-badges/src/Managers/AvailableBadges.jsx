import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
// import { useNavigate } from "react-router-dom";

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
    // navigate("/dashborad/issues");
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
      <h2>Available Badges</h2>
      <div>
        <button className="issue-btn" onClick={handleClickIssue}>
          Go To Existing Issues
        </button>
      </div>
      <FilterButton showLatest={showLatest} onClick={handleFilterClick} />
      <ul>
        {badges.map((badge, index) => (
          <li key={index}>
            <h3>{badge.title}</h3>
            <p>{badge.description}</p>
            <p>
              <strong>Created at:</strong> {badge.created_at}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BadgeList;
