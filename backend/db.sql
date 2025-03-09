CREATE TABLE races (
    id SERIAL PRIMARY KEY,
);
CREATE TABLE bloodlines (
    id SERIAL PRIMARY KEY,
); 
CREATE TABLE places (
    id SERIAL PRIMARY KEY,
);
CREATE TABLE characters (
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255) NOT NULL,
    mname VARCHAR(255),
    lname VARCHAR(255),
    nicknames VARCHAR(255),
    titles VARCHAR(255),
    age VARCHAR(255),
    gender VARCHAR(50) NOT NULL,
    race VARCHAR(255),
    bloodline VARCHAR(255),
    place_of_birth VARCHAR(255)
);

