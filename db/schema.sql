DROP DATABASE IF EXISTS users_db;

CREATE DATABASE users_db;

USE users_db;

CREATE TABLE users (
    id INT AUTO_INCREMENT,
    user_name VARCHAR(255),
    user_email VARCHAR (255),
    user_password VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE strain_names (
    id INT AUTO_INCREMENT,
    strain_name VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE effects (
    id INT AUTO_INCREMENT,
    effect_type VARCHAR(255),
    PRIMARY KEY(id)
);

CREATE TABLE my_trees (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    /*strain_name VARCHAR(255) NOT NULL,*/
    FOREIGN KEY (user_id) REFERENCES users(id),
    /*FOREIGN KEY (strain_name) REFERENCES strain_names(strain_name),*/
    PRIMARY KEY(id)
);