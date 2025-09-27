-- MySQL dump 10.13  Distrib 5.7.42, for Linux (x86_64)
--
-- Host: localhost    Database: dvna
-- ------------------------------------------------------
-- Server version	5.7.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'admin','admin','admin@local','$2a$10$8oQnSAF66lpjFuvgqgFvqu4cUVCBXyKXFqpClvAED89paIWR6gQq6',NULL,'2025-09-27 14:38:51','2025-09-27 14:38:51'),(2,'unibo','unibo','unibo@local','$2a$10$gLw9epzMe3W6Hugugz6pV.uM5siUt82CgYA7v4BdXeJvr07n9G2fe',NULL,'2025-09-27 15:02:01','2025-09-27 15:02:01'),(3,'unibo2','unibo2','unibo2@local','$2a$10$iCTKs422jm6aVOYOZuV8e.y8OMUjjwct7WlY8i2SvQYIXMwzjoBQm',NULL,'2025-09-27 15:03:48','2025-09-27 15:03:48'),(4,'user','user','user@local','$2a$10$HuDWv/mDyDSvybynBxwwL./5HK8JlLuwoMbLFGQk1CiBkmGTy8XuW',NULL,'2025-09-27 15:04:05','2025-09-27 15:04:05'),(5,'user2','user2','user2@local','$2a$10$2UOm6fk1pPMOlnig24YL2uoe3Br9zDzrnzAz6CxOEP5AJCsIIzXK2',NULL,'2025-09-27 15:07:52','2025-09-27 15:07:52');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'XBSX-01','Xbox Series X','La più potente console da gioco prodotta da Microsoft, con supporto 4K.','gaming, console, microsoft','2025-09-27 14:59:35','2025-09-27 14:59:35'),(2,'PS5-01','Playstation 5','Console di nuova generazione prodotta da Sony, con SSD ultra-veloce.','gaming, console, sony','2025-09-27 14:59:35','2025-09-27 14:59:35'),(3,'NSW-OLED-01','Nintendo Switch OLED','Console ibrida di Nintendo con schermo OLED da 7 pollici.','gaming, console, nintendo, portatile','2025-09-27 14:59:35','2025-09-27 14:59:35'),(4,'APL-15P','iPhone 15 Pro','Smartphone di punta di Apple con chip A17 Pro e scocca in titanio.','smartphone, apple, telefono','2025-09-27 14:59:35','2025-09-27 14:59:35'),(5,'SAM-S23','Samsung Galaxy S23','Top di gamma Android di Samsung con fotocamera avanzata.','smartphone, samsung, android, telefono','2025-09-27 14:59:35','2025-09-27 14:59:35'),(6,'APL-MBA-M2','MacBook Air M2','Computer portatile Apple ultra-sottile con processore M2.','laptop, apple, computer, portatile','2025-09-27 14:59:35','2025-09-27 14:59:35'),(7,'NES-VRT-05','Macchina da caffè Nespresso Vertuo','Macchina per caffè che utilizza la tecnologia Centrifusion per un\'estrazione ottimale.','cucina, elettrodomestici, caffè','2025-09-27 14:59:35','2025-09-27 14:59:35'),(8,'IRBT-J7','Robot Aspirapolvere Roomba j7','Robot aspirapolvere intelligente che riconosce ed evita gli ostacoli.','casa, pulizia, robot, elettrodomestici','2025-09-27 14:59:35','2025-09-27 14:59:35'),(9,'BOOK-001','Il Signore degli Anelli','Edizione integrale della celebre trilogia fantasy di J.R.R. Tolkien.','libri, fantasy, tolkien','2025-09-27 14:59:35','2025-09-27 14:59:35');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-27 17:16:59
