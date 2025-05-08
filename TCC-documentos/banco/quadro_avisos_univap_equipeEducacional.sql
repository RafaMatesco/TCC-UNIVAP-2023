CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4*/ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Table structure for table `equipeEducacional`
--

DROP TABLE IF EXISTS `equipeEducacional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `equipeEducacional` (
  `registro` int NOT NULL,
  `nomeadm` varchar(100) DEFAULT NULL,
  `CaminhoFoto` varchar(100) DEFAULT NULL,
  `senha` varchar(20) DEFAULT NULL,
  `IDcargo` int DEFAULT NULL,
  PRIMARY KEY (`registro`),
  KEY `fk_cargo` (`IDcargo`),
  CONSTRAINT `fk_cargo` FOREIGN KEY (`IDcargo`) REFERENCES `cargo` (`IDcargo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipeEducacional`
--

LOCK TABLES `equipeEducacional` WRITE;
INSERT INTO `equipeEducacional` VALUES (1,'Wagner Santos','foto1','senha1',1),(2,'alberson wander','foto2','senha2',2),(3,'Ana Paula','foto3','senha3',3);

UNLOCK TABLES;
-- Dump completed on 2023-09-16 18:09:24
