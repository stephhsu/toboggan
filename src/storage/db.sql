CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(30),
  created timestamptz DEFAULT now()
);

CREATE TABLE soil_moisture (
  ID SERIAL PRIMARY KEY,
  collection_ID VARCHAR(30) NOT NULL,
  sensor VARCHAR(30) NOT NULL,
  created timestamptz NOT NULL DEFAULT now(),
  moisture_val INTEGER,
  moisture_time BIGINT
);