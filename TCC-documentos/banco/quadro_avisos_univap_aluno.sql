CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
--
-- Table structure for table `aluno`
--

DROP TABLE IF EXISTS `aluno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aluno` (
  `IDaluno` int NOT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `senha` varchar(20) DEFAULT NULL,
  `IDturma` int DEFAULT NULL,
  PRIMARY KEY (`IDaluno`),
  KEY `fk_turma` (`IDturma`),
  CONSTRAINT `fk_turma` FOREIGN KEY (`IDturma`) REFERENCES `turma` (`IDturma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aluno`
--

LOCK TABLES `aluno` WRITE;
INSERT INTO `aluno` VALUES (1,'lucas','paulorenatodurante@gmail.com','senha2',2),(2,'mariana','paulorenatodurante@gmail.com','senha1',2),(50210145,'Paulo Renato Mattozo Durante','paulorenatodurante@gmail.com','senha1',1),(50210146,'Rafael Geordano Matexco','rafael.matesco@gmail.com','senha2',1),(50210147,'Leticia Gabriela','leticiao@gmail.com','senha3',3),(50210148,'gabriela Nucci','gabrielanucci@gmail.com','senha4',4),(50210149,'teste','teste@gmail.com','senha9',2),(50210686,'Rafael Matesco','matescorapha@gmail.com','senha7',1);
UNLOCK TABLES;

-- Dump completed on 2023-09-16 18:09:23
