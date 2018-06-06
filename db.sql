CREATE TABLE user(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome varchar(100) NOT NULL,
    cpf varchar(11) NOT NULL,
    senha varchar(25) NOT NULL,
    email varchar(40) NOT NULL,
    PRIMARY KEY (id)
);