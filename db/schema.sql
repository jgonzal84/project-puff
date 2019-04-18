DROP DATABASE IF EXISTS puff_db;

CREATE DATABASE puff_db;

USE puff_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    user_name VARCHAR(255),
    user_email VARCHAR (255),
    user_password VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE strains (
    id INT AUTO_INCREMENT,
    strain_name VARCHAR(255),
    image_url VARCHAR (255),
    PRIMARY KEY(id)
);

CREATE TABLE trees (
    id INT NOT NULL AUTO_INCREMENT,
    my_tree VARCHAR (255),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    PRIMARY KEY(id)
);

CREATE TABLE strain_info (
    id INT NOT NULL AUTO_INCREMENT,
    strain_fact VARCHAR (255),
    strain_type VARCHAR (255),
    strain_taste VARCHAR (255),
    strain_image VARCHAR (255),
    strain_id INT NOT NULL,
    FOREIGN KEY (strain_id) REFERENCES strains(id),
    PRIMARY KEY (id)
);