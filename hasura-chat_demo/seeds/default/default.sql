-- Truncate the users table
TRUNCATE TABLE users CASCADE;


-- Truncate the messages table
TRUNCATE TABLE messages CASCADE;


-- Seed data for users table
INSERT INTO users (username, password) VALUES
  ('John Doe', 'password123'),
  ('Jane Smith', 'password456');

-- Seed data for messages table using the send_message_to_user function
SELECT send_message_to_user(1, 2, 'Hello Jane!');
SELECT send_message_to_user(2, 1, 'Hi John! How are you?');
SELECT send_message_to_user(2, 1, 'Hey John, long time no see!');
SELECT send_message_to_user(1, 2, 'Hi Jane! Nice to meet you!');
