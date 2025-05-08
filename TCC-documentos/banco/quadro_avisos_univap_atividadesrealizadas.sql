CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

--
-- Table structure for table `atividadesrealizadas`
--

DROP TABLE IF EXISTS `atividadesrealizadas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `atividadesrealizadas` (
  `IDatividadesRealizadas` int NOT NULL AUTO_INCREMENT,
  `IDpostagem` int DEFAULT NULL,
  `IDaluno` int DEFAULT NULL,
  `texto` varchar(500) DEFAULT NULL,
  `arquivo` varchar(100) DEFAULT NULL,
  `dataRetorno` datetime DEFAULT NULL,
  PRIMARY KEY (`IDatividadesRealizadas`),
  KEY `fk_ARpostagem` (`IDpostagem`),
  KEY `fk_ARaluno` (`IDaluno`),
  CONSTRAINT `fk_ARaluno` FOREIGN KEY (`IDaluno`) REFERENCES `aluno` (`IDaluno`),
  CONSTRAINT `fk_ARpostagem` FOREIGN KEY (`IDpostagem`) REFERENCES `postagem` (`IDpostagem`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividadesrealizadas`
--

LOCK TABLES `atividadesrealizadas` WRITE;
INSERT INTO `atividadesrealizadas` VALUES (1,70,50210145,'teste para ver o retorno','undefined','2023-09-09 18:33:32'),(2,71,50210145,'teste passando um zip','633009023900e3542e29640c6987ac83-src.rar','2023-09-09 20:13:04');

UNLOCK TABLES;
-- Dump completed on 2023-09-16 18:09:22
