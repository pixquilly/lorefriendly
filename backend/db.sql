CREATE TABLE races (
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
);
CREATE TABLE bloodlines (
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
); 
CREATE TABLE places (
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
);
CREATE TABLE characters (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    fname VARCHAR(255) NOT NULL,
    mname VARCHAR(255),
    lname VARCHAR(255),
    nicknames JSON,
    titles JSON,
    age VARCHAR(255),
    gender VARCHAR(50) NOT NULL,
    race VARCHAR(255),
    bloodline VARCHAR(255),
    place_of_birth VARCHAR(255)
);
CREATE TABLE traits (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
CREATE TABLE character_traits (
    character_id BIGINT UNSIGNED AUTO_INCREMENT,
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
    id SERIAL PRIMARY KEY AUTO_INCREMENT,
    character_id BIGINT UNSIGNED,
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
