CREATE DATABASE database_gestioneventos;
USE  database_gestioneventos;

-- Tabla Usuarios
CREATE TABLE user(
    id INT(11)  PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nombre  VARCHAR(30) NOT NULL,
    cc INT(12) NOT NULL,
    edad INT(2) NOT NULL,
    titulo  VARCHAR(100) NOT NULL,
    correo  VARCHAR(100) NOT NULL,
    clave  VARCHAR(3000) NOT NULL,
   
    rol VARCHAR(20) NOT NULL
);


ALTER TABLE user
    ADD PRIMARY KEY(id);
ALTER TABLE user
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


CREATE TABLE evento(
    idp INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre  VARCHAR(20) NOT NULL,
    fechai date NULL,
    fechaf  date NULL,

    descrp VARCHAR(50) NOT NULL,
    tipodeEvento VARCHAR(40) NOT NULL,
    imagen VARCHAR(1000) NOT NULL,
    user_id INT(11),
    created_at timestamp  NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE reserva(
    idr INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombreEvento  VARCHAR(20) NOT NULL,
    motivo  VARCHAR(20) NOT NULL
);

DESCRIBE user;
DESCRIBE Evento;