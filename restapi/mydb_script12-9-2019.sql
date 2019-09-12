-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.16.04.1

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
-- Table structure for table `bid`
--

DROP TABLE IF EXISTS `bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bid` (
  `bid_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `time` datetime DEFAULT NULL,
  `amount` double DEFAULT NULL,
  `bidder_id` int(10) unsigned NOT NULL,
  `item_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`bid_id`),
  UNIQUE KEY `bid_id_UNIQUE` (`bid_id`),
  KEY `fk_bid_item_idx` (`item_id`),
  KEY `fk_bid_user_idx` (`bidder_id`),
  CONSTRAINT `fk_bid_item` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_bid_user` FOREIGN KEY (`bidder_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bid`
--

LOCK TABLES `bid` WRITE;
/*!40000 ALTER TABLE `bid` DISABLE KEYS */;
INSERT INTO `bid` VALUES (3,NULL,5,5,1),(4,NULL,10,3,2);
/*!40000 ALTER TABLE `bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `category_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `image` blob,
  `general_category_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `name_UNIQUE` (`name`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`),
  KEY `category_general_category_general_category_id_fk` (`general_category_id`),
  CONSTRAINT `category_general_category_general_category_id_fk` FOREIGN KEY (`general_category_id`) REFERENCES `general_category` (`general_category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Computers',NULL,1),(2,'Phones',NULL,1),(3,'Speakers',NULL,1),(4,'Guitars',NULL,2),(5,'Pianos',NULL,2),(6,'Violins',NULL,2),(7,'Cars',NULL,7),(8,'Books',NULL,2),(9,'Wearables',NULL,1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `general_category`
--

DROP TABLE IF EXISTS `general_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `general_category` (
  `general_category_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `image` blob,
  PRIMARY KEY (`general_category_id`),
  UNIQUE KEY `general_category_general_category_id_uindex` (`general_category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `general_category`
--

LOCK TABLES `general_category` WRITE;
/*!40000 ALTER TABLE `general_category` DISABLE KEYS */;
INSERT INTO `general_category` VALUES (1,'Technology',NULL),(2,'Leisure',NULL),(3,'Fashion',NULL),(6,'House - Garden',NULL),(7,'Auto - Moto',NULL);
/*!40000 ALTER TABLE `general_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `item_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT 'No item name available',
  `current_bid` double DEFAULT NULL,
  `buy_price` double DEFAULT NULL,
  `first_bid` double DEFAULT NULL,
  `number_of_bids` int(10) unsigned DEFAULT NULL,
  `started_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `seller_id` int(10) unsigned DEFAULT NULL,
  `description` mediumtext,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_id_UNIQUE` (`item_id`),
  KEY `fk_item_user_idx` (`seller_id`),
  CONSTRAINT `fk_item_user` FOREIGN KEY (`seller_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (1,'TestItem testing',NULL,NULL,NULL,NULL,NULL,NULL,3,'The best testing item ever yeah buy this now broooo!!!',37.98381000,23.72753900,'Athens','Greece'),(2,'Xiaomi 7',NULL,NULL,NULL,NULL,NULL,NULL,5,'xiaomi phone very good klpklpklp',32.95381000,21.72753900,NULL,NULL),(3,'iphone 6',NULL,NULL,NULL,NULL,NULL,NULL,2,'apple iphone klp',NULL,NULL,NULL,NULL),(4,'iphone 10',NULL,NULL,NULL,NULL,NULL,NULL,3,'the new iphone asdd',NULL,NULL,NULL,NULL),(5,'acer s24 laptop',NULL,NULL,NULL,NULL,NULL,NULL,5,'very good laptop many cores',NULL,NULL,NULL,NULL),(6,'smartwatch sony ',NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL),(7,'homo deus',NULL,NULL,NULL,NULL,NULL,NULL,7,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_category`
--

DROP TABLE IF EXISTS `item_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item_category` (
  `item_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`item_id`,`category_id`),
  KEY `fk_item_category_2_idx` (`category_id`),
  CONSTRAINT `fk_item_category_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_item_category_2` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_category`
--

LOCK TABLES `item_category` WRITE;
/*!40000 ALTER TABLE `item_category` DISABLE KEYS */;
INSERT INTO `item_category` VALUES (5,1),(2,2),(3,2),(4,2),(1,5),(7,8),(6,9);
/*!40000 ALTER TABLE `item_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `user_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone_num` varchar(45) DEFAULT NULL,
  `afm` varchar(45) DEFAULT NULL,
  `bidder_rating` double unsigned DEFAULT NULL,
  `seller_rating` double unsigned DEFAULT NULL,
  `is_admin` varchar(1) NOT NULL DEFAULT 'N',
  `address` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  `is_approved` varchar(1) NOT NULL DEFAULT 'N',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  UNIQUE KEY `user_email_uindex` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'admin','admin','Administrator','Administrator','admin@admin.com','6999999999999999','23425446532323453',NULL,NULL,'Y',NULL,NULL,NULL,'Y'),(2,'kostis','kostis','Konstantinos','Mich','osdjf@fsds.gr','32434343534','23436254243243',NULL,NULL,'N',NULL,NULL,NULL,'Y'),(3,'user24','pass','Giorgos','Georgiou','Gdfsfds@GDFd.sg','2435456856',NULL,NULL,NULL,'N',NULL,NULL,NULL,'Y'),(5,'user234224','pass','Akis','Losad','asda@GDFd.sg','234245',NULL,NULL,NULL,'N',NULL,NULL,NULL,'Y'),(6,'postman','test',NULL,NULL,'post@sdflsdjfsl.fd',NULL,'213235433',NULL,NULL,'N',NULL,NULL,NULL,'N'),(7,'alekos','yolo',NULL,'resto','hre@fdd.sd',NULL,'sdfsgdsfsdsfs',0,0,'N',NULL,NULL,NULL,'N');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-12 17:54:38
