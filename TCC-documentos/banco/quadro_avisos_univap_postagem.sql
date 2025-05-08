CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4*/ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

-- Table structure for table `postagem`
--

DROP TABLE IF EXISTS `postagem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postagem` (
  `IDpostagem` int NOT NULL AUTO_INCREMENT,
  `tipoPostagem` int DEFAULT NULL,
  `DataPostagem` datetime DEFAULT NULL,
  `Datavencimento` datetime DEFAULT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `texto` varchar(500) DEFAULT NULL,
  `caminhoArquivo` varchar(200) DEFAULT NULL,
  `arquivada` tinyint DEFAULT NULL,
  `registro` int DEFAULT NULL,
  `IDturma` int DEFAULT NULL,
  PRIMARY KEY (`IDpostagem`),
  KEY `fk_turma2` (`IDturma`),
  KEY `fk_registro` (`registro`),
  CONSTRAINT `fk_registro` FOREIGN KEY (`registro`) REFERENCES `equipeEducacional` (`registro`),
  CONSTRAINT `fk_turma2` FOREIGN KEY (`IDturma`) REFERENCES `turma` (`IDturma`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postagem`
--

LOCK TABLES `postagem` WRITE;
INSERT INTO `postagem` VALUES (70,1,'2023-09-09 00:00:00','2023-09-11 00:00:00','teste retorno ','teste para ver o retorno ','8acd80739a320dd455799adbb171081e-3BIM_PROJETO_PDM (1).docx',0,1,1),(71,1,'2023-09-09 00:00:00','2023-09-16 00:00:00','teste retorno com arquivo',' fkjf k  fk','94ecf252c9f1038fab9763b8b126c2c0-3BIM_PROJETO_PDM (2).docx',0,1,1),(72,1,'2023-09-13 00:00:00','2023-09-13 00:00:00','teste arquivada','sw sf','undefined',1,1,1);

UNLOCK TABLES;

-- Dump completed on 2023-09-16 18:09:21
