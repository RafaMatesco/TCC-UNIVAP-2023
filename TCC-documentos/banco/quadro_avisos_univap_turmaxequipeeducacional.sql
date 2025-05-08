CREATE DATABASE  IF NOT EXISTS `quadro_avisos_univap` /*!40100 DEFAULT CHARACTER SET utf8mb4 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quadro_avisos_univap`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)

--
-- Table structure for table `turmaxequipeeducacional`
--

DROP TABLE IF EXISTS `turmaxequipeeducacional`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turmaxequipeeducacional` (
  `idturmaXequipeeducacional` int NOT NULL AUTO_INCREMENT,
  `registro` int DEFAULT NULL,
  `IDturma` int DEFAULT NULL,
  PRIMARY KEY (`idturmaXequipeeducacional`),
  KEY `fk_turma3` (`IDturma`),
  KEY `fk_registro2` (`registro`),
  CONSTRAINT `fk_registro2` FOREIGN KEY (`registro`) REFERENCES `equipeEducacional` (`registro`),
  CONSTRAINT `fk_turma3` FOREIGN KEY (`IDturma`) REFERENCES `turma` (`IDturma`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 ;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turmaxequipeeducacional`
--

LOCK TABLES `turmaxequipeeducacional` WRITE;
INSERT INTO `turmaxequipeeducacional` VALUES (8,1,2),(9,1,1),(10,2,2);
UNLOCK TABLES;

-- Dump completed on 2023-09-16 18:09:23
