CREATE TABLE users (
    user_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_email text UNIQUE NOT NULL,
    user_name text NOT NULL ,
    user_password text NOT NULL
);

INSERT INTO users(user_email,user_name,user_password) VALUES ('bob@gmail.com','BOB','123');
DELETE FROM users WHERE user_id = 1;
SELECT * FROM users;