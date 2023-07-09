-- Truncate the users table
TRUNCATE TABLE users CASCADE;


-- Truncate the messages table
TRUNCATE TABLE messages CASCADE;


-- Seed data for users table
INSERT INTO users (user_name, user_password, user_profile_picture) VALUES
  ('John Doe', 'password123', 'https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/2/2023_2$largeimg_508812410.jpg'),
  ('Jane Smith', 'password456', 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80');

-- Seed data for messages table using the send_message_to_user function
SELECT send_message_to_user(1, 2, 'Hello Jane!');
SELECT send_message_to_user(2, 1, 'Hi John! How are you?');
SELECT send_message_to_user(2, 1, 'Hey John, long time no see!');
SELECT send_message_to_user(1, 2, 'Hi Jane! Nice to meet you!');
