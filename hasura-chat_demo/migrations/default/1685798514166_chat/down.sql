DROP FUNCTION send_message_to_user(integer,integer,text);
DROP FUNCTION IF EXISTS sign_in(TEXT, TEXT);
DROP VIEW IF EXISTS messages_with_user_data;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS messages CASCADE;
