CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4  */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

--
-- Table structure for table `turma`
--

DROP TABLE IF EXISTS `turma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turma` (
  `IDturma` int NOT NULL,
  `nomeTurma` varchar(4) DEFAULT NULL,
  PRIMARY KEY (`IDturma`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turma`
--

LOCK TABLES `turma` WRITE;
INSERT INTO `turma` VALUES (1,'3°H'),(2,'3°F'),(3,'3°A'),(4,'3°E');
UNLOCK TABLES;
-- Dump completed on 2023-09-16 18:09:22
