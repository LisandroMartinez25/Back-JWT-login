CREATE DATABASE EXAMEN;

USE EXAMEN;

CREATE TABLE Usuario(
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    edad INT,
    avatar TEXT,
    email VARCHAR(50),
    pass LONGTEXT,
    rol INT
);

