CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4*/ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

-- Table structure for table `cargo`
--

DROP TABLE IF EXISTS `cargo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargo` (
  `IDcargo` int NOT NULL,
  `nomeCargo` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`IDcargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargo`
--

LOCK TABLES `cargo` WRITE;
INSERT INTO `cargo` VALUES (1,'professor'),(2,'cordenador do Curso'),(3,'orientadora');
UNLOCK TABLES;

-- Dump completed on 2023-09-16 18:09:23
