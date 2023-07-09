CREATE TABLE IF NOT EXISTS users  (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  user_password VARCHAR(100) NOT NULL,
  user_profile_picture VARCHAR(255) NOT NULL,
  is_typing BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (sender_id) REFERENCES users (id),
  FOREIGN KEY (receiver_id) REFERENCES users (id)
);

CREATE OR REPLACE VIEW messages_with_user_data AS
SELECT
  messages.id AS message_id,
  messages.sender_id,
  messages.receiver_id,
  messages.content,
  messages.created_at AS message_created_at,
  users.user_name,
  users.user_profile_picture
FROM
  messages
JOIN
  users ON messages.sender_id = users.id;


CREATE OR REPLACE FUNCTION sign_in(
  input_name TEXT,
  input_password TEXT
) RETURNS SETOF users AS $$
BEGIN
  RETURN QUERY
    SELECT *
    FROM users
    WHERE user_name = input_name AND user_password = input_password;
END;
$$ LANGUAGE plpgsql;




CREATE OR REPLACE FUNCTION send_message_to_user(
  p_sender_id INT,
  p_receiver_id INT,
  p_content TEXT
)
RETURNS SETOF messages AS $$
BEGIN
  INSERT INTO messages (sender_id, receiver_id, content)
  VALUES (p_sender_id, p_receiver_id, p_content);

  RETURN QUERY SELECT * FROM messages WHERE sender_id = p_sender_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION get_messages_by_receiver(
  p_receiver_id INT
)
RETURNS SETOF messages AS $$
BEGIN
  RETURN QUERY SELECT * FROM messages WHERE receiver_id = p_receiver_id;
END;
$$ LANGUAGE plpgsql;


