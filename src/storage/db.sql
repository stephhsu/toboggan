CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(30),
  created timestamptz
);