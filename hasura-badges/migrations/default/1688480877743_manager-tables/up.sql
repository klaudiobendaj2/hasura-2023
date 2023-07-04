
CREATE TABLE engineer_badge_candidature_proposals (
  engineer INTEGER NOT NULL REFERENCES users(id),
  badge_id INTEGER NOT NULL,
  badge_version TIMESTAMP NOT NULL,
  proposal_description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  created_by INTEGER REFERENCES users(id) ON DELETE RESTRICT,
  PRIMARY KEY (engineer, badge_id, badge_version),
  FOREIGN KEY (badge_id, badge_version) REFERENCES badges_versions(id, created_at)
);

CREATE OR REPLACE FUNCTION get_engineers_by_manager(manager_id INTEGER)
  RETURNS SETOF public.users AS
$$
BEGIN
  RETURN QUERY
    SELECT u.*
    FROM public.users_relations r
    INNER JOIN public.users u ON r.engineer = u.id
    WHERE r.manager = manager_id;
END;
$$
LANGUAGE plpgsql;