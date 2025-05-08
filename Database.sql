CREATE SCHEMA `quadro_avisos_univap`;
USE `quadro_avisos_univap`;

CREATE TABLE `turma` (
  `IDturma` int(10) primary key,
  `nomeTurma` varchar(4)
);

CREATE TABLE `aluno` (
  `IDaluno` int(8) primary key,
  `nome` varchar(100),
  `email` varchar(100),
  `senha` varchar(100),
  `caminhoFoto` varchar(100),
  `IDturma` int(10),
  CONSTRAINT fk_turma 
  FOREIGN KEY (IDturma) REFERENCES turma(IDturma)
 );
 
CREATE TABLE `Cargo` (
  `IDcargo` int(1) primary key,
  `nomeCargo` varchar(50)
);

CREATE TABLE `EquipeEducacional` (
  `registro` int(10) primary key,
  `nomeadm` varchar(100),
  `CaminhoFoto` varchar(100),
  `senha` varchar(20),
  `IDcargo` int(1),
  CONSTRAINT fk_cargo
  FOREIGN KEY (IDcargo) REFERENCES cargo(IDcargo)
);

CREATE TABLE `postagem` (
  `IDpostagem` int(10) primary key auto_increment,
  `tipoPostagem` int,
  `DataPostagem` date,
  `Datavencimento` date,
  `titulo` varchar(100),
  `texto` varchar(500),
  `caminhoArquivo` varchar(200),
  `registro` int(10),
  `IDturma` int(10),
  	CONSTRAINT fk_turma2
  FOREIGN KEY (IDturma) REFERENCES turma(IDturma),
	CONSTRAINT fk_registro
  FOREIGN KEY (registro) REFERENCES EquipeEducacional(registro)
);
CREATE TABLE `atividadesrealizadas` (
  `IDatividadesRealizadas` int(10) primary key auto_increment,
  `IDpostagem` int(10),
  `IDaluno` int(8),
  CONSTRAINT fk_ARpostagem
  FOREIGN KEY (IDpostagem) REFERENCES postagem(IDpostagem),
  CONSTRAINT fk_ARaluno
  FOREIGN KEY (IDaluno) REFERENCES aluno(IDaluno)
);

CREATE TABLE `turmaxequipeeducacional` (
  `idturmaXequipeeducacional` INT NOT NULL AUTO_INCREMENT,
  `registro` INT NULL,
  `IDturma` INT NULL,
  CONSTRAINT fk_turma3
  FOREIGN KEY (IDturma) REFERENCES turma(IDturma),
	CONSTRAINT fk_registro2
  FOREIGN KEY (registro) REFERENCES EquipeEducacional(registro),
  PRIMARY KEY (`idturmaXequipeeducacional`));




#Insert na tabela turma
insert into turma values(01,"3°H");
insert into turma values(02,"3°F");
insert into turma values(03,"3°A");
insert into turma values(04,"3°E");

#Insert na tabela alunos
insert into aluno value(50210145,"Paulo Renato Mattozo Durante", "paulorenatodurante@gmail.com", "senha1","foto1",001);
insert into aluno value(50210146,"Rafael Geordano Matexco", "rafaelmatexco@gmail.com", "senha2","foto2",001);
insert into aluno value(50210147,"Leticia Gabriela", "leticiao@gmail.com", "senha3","foto3",003);
insert into aluno value(50210148,"gabriela Nucci", "gabrielanucci@gmail.com", "senha4","foto4",004);


#Insert na tabela cargo
insert into cargo values(1,"professor");
insert into cargo values(2,"cordenador do Curso");
insert into cargo values(3,"orientadora");

#insert na tabela equipeeducacional
insert into equipeeducacional values(0001,"Wagner Santos", "foto1","senha1", 1);
insert into equipeeducacional values(0002,"alberson wander", "foto2","senha2", 2);
insert into equipeeducacional values(0003,"Ana Paula", "foto3","senha3", 3);

#Insert posts
insert into postagem values(null,1,"2023-04-12","2023-04-14","atividade 1","atividade valendo nota de at","arquivo1", 0001,001 );	
insert into postagem values(null,1,"2023-04-12","2023-04-14","atividade 2","atividade valendo nota de at","arquivo1", 0001,002 );	
insert into postagem values(null,1,"2023-04-12","2023-04-15","atividade 3","atividade valendo nota bimestral","arquivo2", 0002,002 );

#insert na tabela turmaxequipeeducacional
insert into turmaxequipeeducacional values(null,1,1);
insert into turmaxequipeeducacional values(null,1,2);

/*
select * from aluno;
select * from cargo;
select * from curso;
select * from equipeeducacional;
select * from postagem;
select * from turma;



select a.DataPostagem,a.Datavencimento, a.texto,a.caminhoArquivo , b.nomeadm , c.nomeTurma
from postagem a inner join equipeeducacional b on a.registro =b.registro
inner join turma c on c.IDturma = a.IDturma; */
