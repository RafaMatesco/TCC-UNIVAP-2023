CREATE SCHEMA `quadro_avisos_univap`;
USE `quadro_avisos_univap`;

CREATE TABLE `quadro_avisos_univap`.`cargo` (
    `idcargo` INT NOT NULL,
    `nomeCargo` VARCHAR(45) NULL,
    PRIMARY KEY (`idcargo`)
);

CREATE TABLE `quadro_avisos_univap`.`equipeeducacional` (
    `registro` INT NOT NULL,
    `nome` VARCHAR(100) NULL,
    `textoNotificacaol` VARCHAR(500) NULL,
    `senha` VARCHAR(50) NULL,
    `IDcargo` INT NULL,
    PRIMARY KEY (`registro`)
);

CREATE TABLE `quadro_avisos_univap`.`turmaxequipeeducacional` (
    `idturmaXequipeEducacional` INT NOT NULL,
    `registro` INT NULL,
    `IDturma` INT NULL,
    PRIMARY KEY (`idturmaXequipeEducacional`)
);

CREATE TABLE `turma` (
    `IDturma` INT NOT NULL,
    `nomeTurma` VARCHAR(4) DEFAULT NULL,
    PRIMARY KEY (`IDturma`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `postagem` (
    `IDpostagem` INT NOT NULL AUTO_INCREMENT,
    `tipoPostagem` INT DEFAULT NULL,
    `DataPostagem` DATETIME DEFAULT NULL,
    `Datavencimento` DATETIME DEFAULT NULL,
    `titulo` VARCHAR(100) DEFAULT NULL,
    `texto` VARCHAR(500) DEFAULT NULL,
    `caminhoArquivo` VARCHAR(200) DEFAULT NULL,
    `arquivada` TINYINT DEFAULT NULL,
    `idturmaXequipeEducacional` INT DEFAULT NULL,
    PRIMARY KEY (`IDpostagem`),
    FOREIGN KEY (`idturmaXequipeEducacional`)
        REFERENCES `turmaxequipeeducacional` (`idturmaXequipeEducacional`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `atividadesrealizadas` (
    `IDatividadesRealizadas` INT NOT NULL AUTO_INCREMENT,
    `IDpostagem` INT DEFAULT NULL,
    `IDaluno` INT DEFAULT NULL,
    `texto` VARCHAR(500) DEFAULT NULL,
    `arquivo` VARCHAR(100) DEFAULT NULL,
    `dataRetorno` DATETIME DEFAULT NULL,
    PRIMARY KEY (`IDatividadesRealizadas`),
    KEY `fk_ARpostagem` (`IDpostagem`),
    CONSTRAINT `fk_ARpostagem` FOREIGN KEY (`IDpostagem`)
        REFERENCES `postagem` (`IDpostagem`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

CREATE TABLE `aluno` (
    `IDaluno` INT NOT NULL,
    `nome` VARCHAR(100) DEFAULT NULL,
    `email` VARCHAR(100) DEFAULT NULL,
    `senha` VARCHAR(20) DEFAULT NULL,
    `IDturma` INT DEFAULT NULL,
    PRIMARY KEY (`IDaluno`),
    KEY `fk_turma` (`IDturma`),
    CONSTRAINT `fk_turma` FOREIGN KEY (`IDturma`)
        REFERENCES `turma` (`IDturma`)
)  ENGINE=INNODB DEFAULT CHARSET=UTF8MB4;

ALTER TABLE `quadro_avisos_univap`.`equipeeducacional` 
ADD CONSTRAINT `fk_cargo`
  FOREIGN KEY (`IDcargo`)
  REFERENCES `quadro_avisos_univap`.`cargo` (`idcargo`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
ALTER TABLE `quadro_avisos_univap`.`turmaxequipeeducacional` 
ADD CONSTRAINT `fk_turma2`
  FOREIGN KEY (`IDturma`)
  REFERENCES `quadro_avisos_univap`.`turma` (`IDturma`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
ALTER TABLE `quadro_avisos_univap`.`turmaxequipeeducacional` 
ADD CONSTRAINT `fk_registro`
  FOREIGN KEY (`registro`)
  REFERENCES `quadro_avisos_univap`.`equipeeducacional` (`registro`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  