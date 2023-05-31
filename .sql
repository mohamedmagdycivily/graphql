-- docker container run --name testGraphQl -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres:13
-- docker container exec -it testGraphQl psql -U postgres

-- Create the 'users' table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  age INT NOT NULL,
  nationality VARCHAR(255) NOT NULL,
  friends INT[],
  favorite_movies INT[]
);

-- Create the 'movies' table
CREATE TABLE IF NOT EXISTS movies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  year_of_publication INT NOT NULL,
  is_in_theaters BOOLEAN NOT NULL
);

-- Insert mock data into the 'users' table
INSERT INTO users (name, username, age, nationality, friends, favorite_movies)
VALUES
  ('User 1', 'user1', 25, 'CANADA', '{2, 3}', '{1, 3}'),
  ('User 2', 'user2', 30, 'BRAZIL', '{1}', '{2}'),
  ('User 3', 'user3', 28, 'INDIA', '{2}', '{1, 2}'),
  -- Add more entries here
  ('User 50', 'user50', 26, 'CANADA', '{5, 10, 50}', '{2, 3}');

-- Insert mock data into the 'movies' table
INSERT INTO movies (name, year_of_publication, is_in_theaters)
VALUES
  ('Movie 1', 2020, true),
  ('Movie 2', 2018, false),
  ('Movie 3', 2019, true),
  -- Add more entries here
  ('Movie 10', 2022, true);

-- Additional SQL statements can be added here if needed