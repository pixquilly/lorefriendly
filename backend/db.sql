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
    id BIGINT UNSIGNED PRIMARY KEY,  -- Change to BIGINT UNSIGNED to match
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
CREATE TABLE traits (
    id BIGINT UNSIGNED PRIMARY KEY,  -- Change to BIGINT UNSIGNED to match
    name VARCHAR(255) NOT NULL,
    description TEXT,
    character_id BIGINT UNSIGNED,
    CONSTRAINT fk_character
        FOREIGN KEY (character_id)
        REFERENCES characters(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
CREATE TABLE character_traits (
    character_id BIGINT UNSIGNED,
    trait_id BIGINT UNSIGNED,
    PRIMARY KEY (character_id, trait_id),
    CONSTRAINT fk_character_id
        FOREIGN KEY (character_id)
        REFERENCES characters(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_trait_id
        FOREIGN KEY (trait_id)
        REFERENCES traits(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    character_id BIGINT UNSIGNED,  -- Use BIGINT UNSIGNED for consistency
    max_hp INT,
    max_sp INT,
    max_mp INT,
    max_hunger INT,
    max_energy INT,
    CONSTRAINT fk_character_in_units
        FOREIGN KEY (character_id)
        REFERENCES characters(id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
);
