-- Truncate the users table
TRUNCATE TABLE users CASCADE;


-- Truncate the messages table
TRUNCATE TABLE messages CASCADE;


-- Seed data for users table
INSERT INTO users (user_name, user_password, user_profile_picture) VALUES
  ('John Doe', 'password123', 'https://englishtribuneimages.blob.core.windows.net/gallary-content/2023/2/2023_2$largeimg_508812410.jpg'),
  ('Jane Smith', 'password456', 'https://images.unsplash.com/photo-1507019403270-cca502add9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D&w=1000&q=80'),
  ('Alice Johnson', 'password789', 'https://e1.pxfuel.com/desktop-wallpaper/534/172/desktop-wallpaper-stylish-people-to-follow-on-instagram-instagram-girl-profile-pic.jpg'),
  ('Bob Williams', 'password987', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwHvEGamFasFcudDxAlTzNzd2ZsSRKsmf4Uw&usqp=CAU'),
  ('Eve Davis', 'password654', 'https://img.freepik.com/free-photo/happy-business-afro-american-man-standing-smiling-against-blue-background-profile-view_155003-15255.jpg');


-- Seed data for messages table using the send_message_to_user function
SELECT send_message_to_user(1, 2, 'Hello Jane!');
SELECT send_message_to_user(2, 1, 'Hi John! How are you?');
SELECT send_message_to_user(2, 1, 'Hey John, long time no see!');
SELECT send_message_to_user(1, 2, 'Hi Jane! Nice to meet you!');
SELECT send_message_to_user(1, 3, 'Hi Alice!');
SELECT send_message_to_user(1, 4, 'Hi Bob!');
SELECT send_message_to_user(2, 3, 'Hey Alice!');
SELECT send_message_to_user(2, 4, 'Hey Bob!');
SELECT send_message_to_user(3, 4, 'Hi Bob and Eve!');
