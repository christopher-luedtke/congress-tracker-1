DROP DATABASE IF EXISTS congress_tracker;

CREATE DATABASE congress_tracker;

\c congress_tracker 

CREATE TABLE congress (
  id VARCHAR PRIMARY KEY,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  party VARCHAR NOT NULL,
  us_state VARCHAR NOT NULL,
  total_votes INTEGER,
  voted_present INTEGER,
  voted_with INTEGER,
  voted_against INTEGER,
  missed_votes INTEGER
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
  email VARCHAR NOT NULL,
  password VARCHAR,
  congress_following VARCHAR REFERENCES congress(id)
);

Ref: "user"."following" < "congress"."id"