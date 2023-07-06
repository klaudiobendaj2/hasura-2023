CREATE OR REPLACE FUNCTION get_pending_responses_for_engineer(engineer_id INTEGER)
RETURNS SETOF engineer_badge_candidature_proposal_response
AS $$
BEGIN
  RETURN QUERY
  SELECT response_id, is_approved, disapproval_motivation, proposal_id, created_at, created_by
  FROM engineer_badge_candidature_proposal_response
  WHERE created_by = engineer_id AND is_approved = NULL;
END;
$$ LANGUAGE PLPGSQL;


CREATE TABLE engineer_to_manager_badge_candidature_proposals (
  id SERIAL PRIMARY KEY, 
  manager INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  badge_id INTEGER NOT NULL,
  badge_version TIMESTAMP NOT NULL,
  proposal_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (badge_id, badge_version) REFERENCES badges_versions(id, created_at)
);


CREATE TABLE manager_badge_candidature_proposal_response (
  response_id SERIAL PRIMARY KEY,
  is_approved BOOLEAN NOT NULL,
  disapproval_motivation VARCHAR(255) DEFAULT NULL,
  proposal_id INTEGER NOT NULL REFERENCES engineer_to_manager_badge_candidature_proposals(id) ON DELETE RESTRICT,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by INTEGER REFERENCES users(id) ON DELETE RESTRICT
);


-- CREATE TABLE badge_candidature_request (
--   id: SERIAL PRIMARY KEY,
--   is_issued BOOLEAN NOT NULL,
--   badge_id INTEGER NOT NULL,
--   badge_version TIMESTAMP NOT NULL,
--   badge_description TEXT NOT NULL,
--   badge_title TEXT NOT NULL,
--   badges_requirements JSONB NOT NULL,
--   engineer_id INTEGER NOT NULL;
--   manager_id INTEGER NOT NULL;
--   candidature_evidences JSONB,
--   created_at TIMESTAMP NOT NULL DEFAULT now()
-- )