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