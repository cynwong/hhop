DROP DATABASE IF EXISTS RecipeDB;
CREATE DATABASE RecipeDB;

USE RecipeDB;

CREATE TABLE users(
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NULL,
    password VARCHAR(30) NULL,
    first_name VARCHAR(30) NULL,
    last_name VARCHAR(30) NULL,
    email VARCHAR(30) NULL,
    PRIMARY KEY (id)
);
CREATE TABLE recipe (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    title VARCHAR(30),
    ingredient VARCHAR(255) NULL,
    cooking_step VARCHAR(255) NULL,
    isprivate BOOLEAN NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE favorite (
    id INT NOT NULL AUTO_INCREMENT,
    user_id INT NULL,
    recipe_id INT NULL,
    PRIMARY KEY (id)
)