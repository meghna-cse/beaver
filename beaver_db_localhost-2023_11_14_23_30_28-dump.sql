
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `course_instructors`
--

DROP TABLE IF EXISTS `course_instructors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_instructors` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` bigint(20) unsigned NOT NULL,
  `instructor_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_instructors_course_id_instructor_id_unique` (`course_id`,`instructor_id`),
  KEY `course_instructors_instructor_id_foreign` (`instructor_id`),
  KEY `course_instructors_created_by_foreign` (`created_by`),
  KEY `course_instructors_updated_by_foreign` (`updated_by`),
  CONSTRAINT `course_instructors_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `course_instructors_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `course_instructors_instructor_id_foreign` FOREIGN KEY (`instructor_id`) REFERENCES `users` (`id`),
  CONSTRAINT `course_instructors_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_instructors`
--

LOCK TABLES `course_instructors` WRITE;
/*!40000 ALTER TABLE `course_instructors` DISABLE KEYS */;
INSERT INTO `course_instructors` VALUES
(1,1,1,1,1,1,'2023-11-11 19:59:59','2023-11-11 20:04:36');
/*!40000 ALTER TABLE `course_instructors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_objectives`
--

DROP TABLE IF EXISTS `course_objectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_objectives` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `course_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `course_objectives_course_id_name_unique` (`course_id`,`name`),
  KEY `course_objectives_created_by_foreign` (`created_by`),
  KEY `course_objectives_updated_by_foreign` (`updated_by`),
  CONSTRAINT `course_objectives_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `course_objectives_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `course_objectives_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_objectives`
--

LOCK TABLES `course_objectives` WRITE;
/*!40000 ALTER TABLE `course_objectives` DISABLE KEYS */;
INSERT INTO `course_objectives` VALUES
(1,'Sally More and rad','As above',1,'2023-11-12 00:30:58','2023-11-12 00:32:39',1,1,1),
(2,'The goal is the way','The goal is the way bwana',1,'2023-11-13 05:00:59','2023-11-13 05:00:59',1,NULL,1),
(3,'Niko','Niko na nanii',1,'2023-11-14 12:12:36','2023-11-14 12:12:36',1,NULL,1);
/*!40000 ALTER TABLE `course_objectives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `courses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `courses_created_by_foreign` (`created_by`),
  KEY `courses_updated_by_foreign` (`updated_by`),
  CONSTRAINT `courses_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `courses_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES
(1,'Kwamboka Simple Course','Kwamboka Course','2023-11-11 19:27:17','2023-11-11 19:54:29',1,NULL,1),
(2,'Kwamboka Course','Kwamboka Course','2023-11-11 19:53:41','2023-11-11 19:53:41',1,NULL,1),
(3,'Sample','Sampe','2023-11-14 12:19:12','2023-11-14 12:19:12',1,NULL,1);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_formats`
--

DROP TABLE IF EXISTS `exam_formats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam_formats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `format` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `exam_formats_created_by_foreign` (`created_by`),
  KEY `exam_formats_updated_by_foreign` (`updated_by`),
  CONSTRAINT `exam_formats_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `exam_formats_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_formats`
--

LOCK TABLES `exam_formats` WRITE;
/*!40000 ALTER TABLE `exam_formats` DISABLE KEYS */;
INSERT INTO `exam_formats` VALUES
(1,'Multiple Choice',NULL,NULL,NULL,NULL,1),
(2,'Essay',NULL,NULL,NULL,NULL,1),
(3,'Practical Exam',NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `exam_formats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_objectives`
--

DROP TABLE IF EXISTS `exam_objectives`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam_objectives` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `exam_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exam_objectives_name_exam_id_unique` (`name`,`exam_id`),
  KEY `exam_objectives_exam_id_foreign` (`exam_id`),
  KEY `exam_objectives_created_by_foreign` (`created_by`),
  KEY `exam_objectives_updated_by_foreign` (`updated_by`),
  CONSTRAINT `exam_objectives_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `exam_objectives_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `exam_objectives_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_objectives`
--

LOCK TABLES `exam_objectives` WRITE;
/*!40000 ALTER TABLE `exam_objectives` DISABLE KEYS */;
INSERT INTO `exam_objectives` VALUES
(1,'Exam Objective ya hivi hivi','Ati why?',1,'2023-11-12 08:11:38','2023-11-12 08:12:31',1,1,1);
/*!40000 ALTER TABLE `exam_objectives` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exam_types`
--

DROP TABLE IF EXISTS `exam_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exam_types` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `exam_types_created_by_foreign` (`created_by`),
  KEY `exam_types_updated_by_foreign` (`updated_by`),
  CONSTRAINT `exam_types_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `exam_types_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exam_types`
--

LOCK TABLES `exam_types` WRITE;
/*!40000 ALTER TABLE `exam_types` DISABLE KEYS */;
INSERT INTO `exam_types` VALUES
(1,'Midterm Exams ',NULL,NULL,NULL,NULL,1),
(2,'Quiz',NULL,NULL,NULL,NULL,1),
(3,'Final Exam',NULL,NULL,NULL,NULL,1);
/*!40000 ALTER TABLE `exam_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exams`
--

DROP TABLE IF EXISTS `exams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exams` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `course_id` bigint(20) unsigned NOT NULL,
  `exam_date` datetime NOT NULL,
  `exam_type_id` bigint(20) unsigned NOT NULL,
  `exam_format_id` bigint(20) unsigned NOT NULL,
  `max_score` int(11) NOT NULL,
  `passing_score` int(11) NOT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exams_name_course_id_unique` (`name`,`course_id`),
  KEY `exams_course_id_foreign` (`course_id`),
  KEY `exams_exam_type_id_foreign` (`exam_type_id`),
  KEY `exams_exam_format_id_foreign` (`exam_format_id`),
  KEY `exams_created_by_foreign` (`created_by`),
  KEY `exams_updated_by_foreign` (`updated_by`),
  CONSTRAINT `exams_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `exams_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `exams_exam_format_id_foreign` FOREIGN KEY (`exam_format_id`) REFERENCES `exam_formats` (`id`),
  CONSTRAINT `exams_exam_type_id_foreign` FOREIGN KEY (`exam_type_id`) REFERENCES `exam_types` (`id`),
  CONSTRAINT `exams_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exams`
--

LOCK TABLES `exams` WRITE;
/*!40000 ALTER TABLE `exams` DISABLE KEYS */;
INSERT INTO `exams` VALUES
(1,'Simon Brenjon Exam',1,'2023-10-30 00:00:00',2,3,100,70,NULL,1,1,'2023-11-12 00:57:26','2023-11-12 01:06:22'),
(3,'Research Method Exam',1,'2023-10-30 00:00:00',2,3,100,70,NULL,NULL,1,'2023-11-12 01:01:32','2023-11-12 01:01:32'),
(4,'Acturial Methods Exam',1,'2023-10-30 00:00:00',2,3,100,70,NULL,NULL,1,'2023-11-12 01:02:06','2023-11-12 01:02:06'),
(5,'Kilos Exam',1,'2023-11-13 00:00:00',1,1,100,80,1,NULL,1,'2023-11-13 05:45:21','2023-11-13 05:45:21'),
(6,'Deretruce',1,'2023-11-13 00:00:00',2,3,100,70,1,NULL,1,'2023-11-14 14:44:50','2023-11-14 14:44:50');
/*!40000 ALTER TABLE `exams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` bigint(20) unsigned NOT NULL,
  `receiver_id` bigint(20) unsigned NOT NULL,
  `content` text NOT NULL,
  `message_time` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `messages_sender_id_foreign` (`sender_id`),
  KEY `messages_receiver_id_foreign` (`receiver_id`),
  KEY `messages_created_by_foreign` (`created_by`),
  KEY `messages_updated_by_foreign` (`updated_by`),
  CONSTRAINT `messages_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`),
  CONSTRAINT `messages_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES
(1,2,1,'Ndio nacheki!','2023-11-12 03:30:47','2023-11-12 08:30:47','2023-11-12 08:30:47',1,NULL,1),
(2,1,2,'Mrume sema','2023-11-13 01:11:05','2023-11-13 06:11:05','2023-11-13 06:11:05',1,NULL,1),
(3,1,2,'Vaite','2023-11-13 01:15:16','2023-11-13 06:15:16','2023-11-13 06:15:16',1,NULL,1),
(4,1,2,'Sema','2023-11-13 01:18:50','2023-11-13 06:18:50','2023-11-13 06:18:50',1,NULL,1),
(5,1,2,'Oya','2023-11-13 01:19:53','2023-11-13 06:19:53','2023-11-13 06:19:53',1,NULL,1),
(6,1,2,'Umeona hiyo','2023-11-13 01:20:27','2023-11-13 06:20:27','2023-11-13 06:20:27',1,NULL,1),
(7,1,2,'Mary','2023-11-13 01:21:03','2023-11-13 06:21:03','2023-11-13 06:21:03',1,NULL,1),
(8,1,2,'Tracy','2023-11-13 01:21:21','2023-11-13 06:21:21','2023-11-13 06:21:21',1,NULL,1),
(9,1,2,'Sally','2023-11-13 01:21:28','2023-11-13 06:21:28','2023-11-13 06:21:28',1,NULL,1),
(10,2,10,'Hey Ndindi','2023-11-14 06:47:40','2023-11-14 11:47:40','2023-11-14 11:47:40',2,NULL,1),
(11,1,2,'Just got your message','2023-11-14 06:48:29','2023-11-14 11:48:29','2023-11-14 11:48:29',1,NULL,1),
(12,2,1,'Nipeleke pole pole','2023-11-14 06:54:31','2023-11-14 11:54:31','2023-11-14 11:54:31',2,NULL,1),
(13,1,2,'Kwa nini bana, nadhany umeivia','2023-11-14 06:54:48','2023-11-14 11:54:48','2023-11-14 11:54:48',1,NULL,1),
(14,7,5,'Sasa Nderu','2023-11-14 11:56:39','2023-11-14 16:56:39','2023-11-14 16:56:39',7,NULL,1),
(15,7,5,'Hey','2023-11-14 12:07:07','2023-11-14 17:07:07','2023-11-14 17:07:07',7,NULL,1),
(16,2,1,'Nipeleke pole pole','2023-11-14 14:34:03','2023-11-14 19:34:03','2023-11-14 19:34:03',2,NULL,1),
(17,2,1,'Nipeleke pole pole','2023-11-14 14:35:12','2023-11-14 19:35:12','2023-11-14 19:35:12',2,NULL,1),
(18,2,1,'Cow','2023-11-14 14:35:16','2023-11-14 19:35:16','2023-11-14 19:35:16',2,NULL,1),
(19,2,1,'Hey there, how are you?','2023-11-14 14:36:31','2023-11-14 19:36:31','2023-11-14 19:36:31',2,NULL,1),
(20,2,1,'Take a look','2023-11-14 14:37:24','2023-11-14 19:37:24','2023-11-14 19:37:24',2,NULL,1),
(21,1,5,'Sample','2023-11-14 15:06:34','2023-11-14 20:06:34','2023-11-14 20:06:34',1,NULL,1),
(22,1,5,'New','2023-11-14 15:19:34','2023-11-14 20:19:34','2023-11-14 20:19:34',1,NULL,1),
(23,1,5,'Cow','2023-11-14 15:20:43','2023-11-14 20:20:43','2023-11-14 20:20:43',1,NULL,1),
(24,1,5,'Haya basi','2023-11-14 15:21:02','2023-11-14 20:21:02','2023-11-14 20:21:02',1,NULL,1),
(25,1,5,'Cow','2023-11-14 15:23:54','2023-11-14 20:23:54','2023-11-14 20:23:54',1,NULL,1),
(26,1,5,'Hey','2023-11-14 15:24:40','2023-11-14 20:24:40','2023-11-14 20:24:40',1,NULL,1),
(27,1,5,'Vimbada','2023-11-14 15:25:44','2023-11-14 20:25:44','2023-11-14 20:25:44',1,NULL,1),
(28,1,5,'Kwe kwe','2023-11-14 15:26:35','2023-11-14 20:26:35','2023-11-14 20:26:35',1,NULL,1),
(29,5,1,'Sema','2023-11-14 15:27:22','2023-11-14 20:27:22','2023-11-14 20:27:22',5,NULL,1),
(30,1,5,'Teren teren','2023-11-14 15:27:52','2023-11-14 20:27:52','2023-11-14 20:27:52',1,NULL,1),
(31,5,1,'Umeona hiyo story','2023-11-14 15:28:14','2023-11-14 20:28:14','2023-11-14 20:28:14',5,NULL,1),
(32,1,5,'Gani mdau?','2023-11-14 15:28:36','2023-11-14 20:28:36','2023-11-14 20:28:36',1,NULL,1),
(33,5,1,'Niko hapa maratani','2023-11-14 15:41:37','2023-11-14 20:41:37','2023-11-14 20:41:37',5,NULL,1),
(34,5,1,'Niko hapa maratani','2023-11-14 15:41:37','2023-11-14 20:41:37','2023-11-14 20:41:37',5,NULL,1),
(35,5,1,'Teka msupa','2023-11-14 15:44:16','2023-11-14 20:44:16','2023-11-14 20:44:16',5,NULL,1),
(36,5,1,'Oya manni!','2023-11-14 15:49:27','2023-11-14 20:49:27','2023-11-14 20:49:27',5,NULL,1),
(37,1,5,'Cheki','2023-11-14 15:51:57','2023-11-14 20:51:57','2023-11-14 20:51:57',1,NULL,1),
(38,1,5,'Kuko aje','2023-11-15 02:40:33','2023-11-15 07:40:33','2023-11-15 07:40:33',1,NULL,1),
(39,1,5,'Hujaona hii','2023-11-15 02:41:01','2023-11-15 07:41:01','2023-11-15 07:41:01',1,NULL,1),
(40,1,5,'Hey','2023-11-15 02:41:55','2023-11-15 07:41:55','2023-11-15 07:41:55',1,NULL,1),
(41,5,1,'Sasa','2023-11-15 02:42:07','2023-11-15 07:42:07','2023-11-15 07:42:07',5,NULL,1),
(42,5,1,'Hapo sasa','2023-11-15 02:53:19','2023-11-15 07:53:19','2023-11-15 07:53:19',5,NULL,1),
(43,5,1,'Hapa kule','2023-11-15 02:55:12','2023-11-15 07:55:12','2023-11-15 07:55:12',5,NULL,1),
(44,1,5,'Tukule','2023-11-15 02:56:21','2023-11-15 07:56:21','2023-11-15 07:56:21',1,NULL,1),
(45,5,1,'Ni mapema mdau','2023-11-15 02:56:36','2023-11-15 07:56:36','2023-11-15 07:56:36',5,NULL,1),
(46,5,1,'HUjaona hiyo','2023-11-15 02:57:11','2023-11-15 07:57:11','2023-11-15 07:57:11',5,NULL,1),
(47,1,5,'Haya basi','2023-11-15 02:58:26','2023-11-15 07:58:26','2023-11-15 07:58:26',1,NULL,1),
(48,5,1,'Sasa ona','2023-11-15 02:59:04','2023-11-15 07:59:04','2023-11-15 07:59:04',5,NULL,1),
(49,5,1,'Sasa ona','2023-11-15 02:59:04','2023-11-15 07:59:04','2023-11-15 07:59:04',5,NULL,1),
(50,1,5,'Haujapata aje','2023-11-15 02:59:23','2023-11-15 07:59:23','2023-11-15 07:59:23',1,NULL,1),
(51,5,1,'Teren teren','2023-11-15 02:59:44','2023-11-15 07:59:44','2023-11-15 07:59:44',5,NULL,1),
(52,9,5,'Sasa','2023-11-15 03:12:12','2023-11-15 08:12:12','2023-11-15 08:12:12',9,NULL,1),
(53,5,9,'Naona uko fiti','2023-11-15 03:12:25','2023-11-15 08:12:25','2023-11-15 08:12:25',5,NULL,1),
(54,5,9,'Umeona?','2023-11-15 03:12:46','2023-11-15 08:12:46','2023-11-15 08:12:46',5,NULL,1),
(55,9,5,'HUjapata aje','2023-11-15 03:13:08','2023-11-15 08:13:08','2023-11-15 08:13:08',9,NULL,1),
(56,10,9,'Hi','2023-11-15 03:25:37','2023-11-15 08:25:37','2023-11-15 08:25:37',10,NULL,1),
(57,9,10,'You good?','2023-11-15 03:25:49','2023-11-15 08:25:49','2023-11-15 08:25:49',9,NULL,1),
(58,10,9,'Very good, how is work n\' stuff?','2023-11-15 03:26:06','2023-11-15 08:26:06','2023-11-15 08:26:06',10,NULL,1),
(59,10,9,'Network issue?','2023-11-15 03:26:47','2023-11-15 08:26:47','2023-11-15 08:26:47',10,NULL,1),
(60,9,10,'Seen it?','2023-11-15 03:27:26','2023-11-15 08:27:26','2023-11-15 08:27:26',9,NULL,1),
(61,10,9,'Seen what?','2023-11-15 03:27:44','2023-11-15 08:27:44','2023-11-15 08:27:44',10,NULL,1),
(62,9,10,'Something over there?','2023-11-15 03:31:45','2023-11-15 08:31:45','2023-11-15 08:31:45',9,NULL,1),
(63,10,9,'Very conspicuous','2023-11-15 03:32:02','2023-11-15 08:32:02','2023-11-15 08:32:02',10,NULL,1),
(64,9,10,'Niko','2023-11-15 03:32:46','2023-11-15 08:32:46','2023-11-15 08:32:46',9,NULL,1),
(65,10,9,'Inakaa kwako zinakuja mbio','2023-11-15 03:33:00','2023-11-15 08:33:00','2023-11-15 08:33:00',10,NULL,1),
(66,9,10,'Sijui kwa nini kwako zinalag','2023-11-15 03:33:24','2023-11-15 08:33:24','2023-11-15 08:33:24',9,NULL,1);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'2013_11_10_194937_create_roles_table',1),
(2,'2014_10_12_000000_create_users_table',1),
(3,'2014_10_12_100000_create_password_reset_tokens_table',1),
(4,'2019_08_19_000000_create_failed_jobs_table',1),
(5,'2019_12_14_000001_create_personal_access_tokens_table',1),
(6,'2023_11_10_194120_create_courses_table',1),
(7,'2023_11_10_195330_create_course_instructors_table',1),
(8,'2023_11_10_195519_create_course_objectives_table',1),
(9,'2023_11_10_200040_create_exam_types_table',1),
(10,'2023_11_10_200047_create_exam_formats_table',1),
(11,'2023_11_10_200048_create_exams_table',1),
(12,'2023_11_10_201425_create_exam_objectives_table',1),
(13,'2023_11_10_201647_create_messages_table',1),
(14,'2023_11_11_042819_create_qa_feedback_table',1),
(15,'2023_11_11_043142_create_student_enrolments_table',1),
(16,'2023_11_11_043253_create_student_performances_table',1),
(17,'2023_11_11_043415_create_tickets_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) unsigned NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
INSERT INTO `personal_access_tokens` VALUES
(4,'App\\Models\\User',1,'admin','3944368c68361da8a8b521be4eb14c7cd27cbcb56842c96944e9a3e979d6eda0','[\"*\"]','2023-11-13 05:07:35',NULL,'2023-11-11 11:45:43','2023-11-13 05:07:35'),
(5,'App\\Models\\User',1,'admin','276f844da5daab3725ad049dc9e60ce2b2c2f1299b3a9539f952b1dda454b3d8','[\"*\"]',NULL,NULL,'2023-11-12 23:15:47','2023-11-12 23:15:47'),
(6,'App\\Models\\User',1,'admin','bc3e92736a2ef9758fb2f1f8565374b4273c9e9214b4a9f4483e194bd4ecd87a','[\"*\"]',NULL,NULL,'2023-11-12 23:16:00','2023-11-12 23:16:00'),
(7,'App\\Models\\User',1,'admin','00729ab096e9189812782e8de2b16f870c1654edf255993bf988aba1f099c68a','[\"*\"]',NULL,NULL,'2023-11-12 23:16:16','2023-11-12 23:16:16'),
(8,'App\\Models\\User',1,'admin','84388772df52281a8e35210e9b8aae18b62e3c2331bd07b6522bc063c4c44028','[\"*\"]',NULL,NULL,'2023-11-12 23:17:07','2023-11-12 23:17:07'),
(9,'App\\Models\\User',1,'admin','7deaf49b23df9797e38f18ca52b02529f660bff9fb3b65b8b0f332cf2390e8bc','[\"*\"]',NULL,NULL,'2023-11-12 23:17:38','2023-11-12 23:17:38'),
(10,'App\\Models\\User',1,'admin','c925ff00f66a2ebb1d3c2d4ba9c8ec6d1c63041b05a4230907687908ec9e8a90','[\"*\"]',NULL,NULL,'2023-11-12 23:19:52','2023-11-12 23:19:52'),
(11,'App\\Models\\User',1,'admin','565137db29303dc42b3b1ad3c35cb756b4b2f76e21102fa2419411a5499175b6','[\"*\"]',NULL,NULL,'2023-11-12 23:44:22','2023-11-12 23:44:22'),
(12,'App\\Models\\User',1,'admin','7a83560d319b2956bea416db6bb85ff50a0c3718a89398885b3dc48a9a5e5c8b','[\"*\"]','2023-11-13 06:01:35',NULL,'2023-11-12 23:56:38','2023-11-13 06:01:35'),
(13,'App\\Models\\User',1,'admin','4c9f1f9a5d46241244a1428f588cda92b8b839d596f8fb7755cf5d19ccc2108a','[\"*\"]','2023-11-14 15:11:26',NULL,'2023-11-13 05:26:43','2023-11-14 15:11:26'),
(14,'App\\Models\\User',1,'admin','f65264768d761d713d91d619fb304919d4fc3a9b70e1bdb4c39fa1e9588f4099','[\"*\"]','2023-11-13 06:03:24',NULL,'2023-11-13 06:03:03','2023-11-13 06:03:24'),
(15,'App\\Models\\User',1,'admin','7a05ca9f0a5aa56a7892cbaa0c25fe8c6ef2a4b808adf67066cc808fb1562436','[\"*\"]','2023-11-13 07:11:36',NULL,'2023-11-13 06:04:33','2023-11-13 07:11:36'),
(16,'App\\Models\\User',3,'admin','801f601b349a106bd29b23dc4d48ee3fe2f57f2e7566b750a64682b6ae60a2ea','[\"*\"]','2023-11-13 07:41:00',NULL,'2023-11-13 07:21:13','2023-11-13 07:41:00'),
(17,'App\\Models\\User',3,'admin','e2f7bf67b7ce074a52c95fe593a3b09405720636b9c19dc5c8eb8272cfda9469','[\"*\"]','2023-11-13 11:00:49',NULL,'2023-11-13 11:00:23','2023-11-13 11:00:49'),
(18,'App\\Models\\User',4,'admin','936fcbeba556c0feffb43c246b7161131e02244dc0cee8cbd0c5cf1298da03e2','[\"*\"]','2023-11-13 12:07:32',NULL,'2023-11-13 11:02:07','2023-11-13 12:07:32'),
(19,'App\\Models\\User',5,'admin','f4e4758a31d5d6eeaa483b4f80e8409450e749d3b43dc1ee085fd02d7552e3a3','[\"*\"]',NULL,NULL,'2023-11-13 12:11:33','2023-11-13 12:11:33'),
(20,'App\\Models\\User',5,'admin','bb506479b16e8c111d93a7bcb3c5881a3cee648cd4a4ea13965621e2d2ad829e','[\"*\"]','2023-11-13 15:06:39',NULL,'2023-11-13 13:56:15','2023-11-13 15:06:39'),
(21,'App\\Models\\User',1,'admin','1a006cce793d2be46717e41e1b0878527faf7d4b31b53d98427b41cde14daf49','[\"*\"]','2023-11-13 21:24:53',NULL,'2023-11-13 21:06:47','2023-11-13 21:24:53'),
(22,'App\\Models\\User',2,'admin','c4ebbb5c80d3d752c6639b6b60afb91cc1e75c550b0c0a1af6383a9aaaa0b9e1','[\"*\"]','2023-11-14 11:19:51',NULL,'2023-11-13 21:25:49','2023-11-14 11:19:51'),
(23,'App\\Models\\User',1,'admin','349071cfbeb9dfbbb5b7f575480211c2f9bc5c83b645086a05659ca7b5e539b0','[\"*\"]',NULL,NULL,'2023-11-14 11:02:22','2023-11-14 11:02:22'),
(24,'App\\Models\\User',2,'admin','a64e615d6c1af216691d04dbb37a647d4cab6577d7ba8733a20eadb66994a342','[\"*\"]','2023-11-14 11:25:57',NULL,'2023-11-14 11:25:47','2023-11-14 11:25:57'),
(25,'App\\Models\\User',2,'admin','238ad5de22db13255cfc929e5e495bdf48e66e397ea5049477a6d5a436e8d69f','[\"*\"]','2023-11-14 19:38:20',NULL,'2023-11-14 11:26:12','2023-11-14 19:38:20'),
(26,'App\\Models\\User',1,'admin','f6176efa77e068461b84814fa3a29418907d1eae362c1262e1233b085c4d1d6f','[\"*\"]','2023-11-14 14:24:08',NULL,'2023-11-14 11:47:57','2023-11-14 14:24:08'),
(27,'App\\Models\\User',3,'admin','a3707f929111ed7aa9456d58d0506bb6082e0c9616227fe1b12c37b685a5ba0a','[\"*\"]','2023-11-14 14:25:43',NULL,'2023-11-14 14:25:32','2023-11-14 14:25:43'),
(28,'App\\Models\\User',4,'admin','b8199759764961f4f35e1ad2c6ce0af3bf821aca956d04a40437a93a1fcd88a1','[\"*\"]','2023-11-14 14:26:33',NULL,'2023-11-14 14:26:13','2023-11-14 14:26:33'),
(29,'App\\Models\\User',5,'admin','df6ef8c48afebbd0f87578a83d0d91903a23e72cefa8ec864ee3bd50d429cbb5','[\"*\"]','2023-11-14 14:37:49',NULL,'2023-11-14 14:27:05','2023-11-14 14:37:49'),
(30,'App\\Models\\User',1,'admin','1a0b27ebaf21ed247774092e676e3cecb191a9a6dd1039ed20829d53c107c9e5','[\"*\"]','2023-11-14 14:44:54',NULL,'2023-11-14 14:41:10','2023-11-14 14:44:54'),
(31,'App\\Models\\User',2,'admin','3e690c27b3c45c46aa784c04421001952802e2ed4a690f3261a5eb180e9a1e29','[\"*\"]','2023-11-14 15:28:58',NULL,'2023-11-14 14:48:12','2023-11-14 15:28:58'),
(32,'App\\Models\\User',5,'admin','59adf3218970fcd246d6cda8b134eada2bb7dff666c009fb8f86230cd500be5b','[\"*\"]','2023-11-14 15:37:08',NULL,'2023-11-14 15:36:59','2023-11-14 15:37:08'),
(33,'App\\Models\\User',7,'admin','a368c6842c3d28de33db43d5b750dcffc5bcc4afcb3915fb4d3a5e6f80be1d5f','[\"*\"]','2023-11-14 17:19:01',NULL,'2023-11-14 15:42:53','2023-11-14 17:19:01'),
(34,'App\\Models\\User',1,'admin','3d352c2864cebba3ab545f144c9b134886d0c8afe44970cb0899a71481ae2ec4','[\"*\"]','2023-11-14 19:50:18',NULL,'2023-11-14 19:50:04','2023-11-14 19:50:18'),
(35,'App\\Models\\User',1,'admin','152ffb22a854a6718484b59e7fdb98ff12bdea72bdbe1292d0a16cbfdb9ab826','[\"*\"]','2023-11-14 20:01:30',NULL,'2023-11-14 20:01:22','2023-11-14 20:01:30'),
(36,'App\\Models\\User',1,'admin','31adcee504cbafca99589f6035819d3ec0268461ae080c16a39208f3a7d1e920','[\"*\"]','2023-11-14 20:03:00',NULL,'2023-11-14 20:02:53','2023-11-14 20:03:00'),
(37,'App\\Models\\User',1,'admin','c02b1aaf3dceff7b16cf5a7cf4221ddb31b17f63b0112c06dd4a7c1056e6ea34','[\"*\"]','2023-11-14 20:49:00',NULL,'2023-11-14 20:06:12','2023-11-14 20:49:00'),
(38,'App\\Models\\User',5,'admin','dcb37a9fe697ad70a53492d69e043728c6192fd3668202035eda535bb25d9ecf','[\"*\"]','2023-11-14 20:49:27',NULL,'2023-11-14 20:24:20','2023-11-14 20:49:27'),
(39,'App\\Models\\User',5,'admin','354b4c82e13f327222ed924a619a7d95d68d08430ac1be8ea7e9c8041483c99d','[\"*\"]','2023-11-14 20:51:27',NULL,'2023-11-14 20:51:19','2023-11-14 20:51:27'),
(40,'App\\Models\\User',1,'admin','fd4fd63905620fc8bc7990cbf5792bcc6fe076a448f604e04236ae11620e8857','[\"*\"]','2023-11-14 20:51:58',NULL,'2023-11-14 20:51:41','2023-11-14 20:51:58'),
(41,'App\\Models\\User',1,'admin','c4342169cf07cba481131a19183b3fe0a54c13e0ccad34d8131fb282acadc08d','[\"*\"]','2023-11-15 07:41:55',NULL,'2023-11-15 07:39:38','2023-11-15 07:41:55'),
(42,'App\\Models\\User',5,'admin','b1d76b9ff1344ba29a8504e34b531def2ca76d8b957e98abd56f331b63b4a452','[\"*\"]','2023-11-15 08:24:49',NULL,'2023-11-15 07:40:10','2023-11-15 08:24:49'),
(43,'App\\Models\\User',1,'admin','faf9901b6df21d1f1641c95364be92d11ee0cdee6db89519ac85390aafcbffeb','[\"*\"]','2023-11-15 07:54:21',NULL,'2023-11-15 07:52:40','2023-11-15 07:54:21'),
(44,'App\\Models\\User',1,'admin','7af348f3f58e0403f33069aa183c92b71e7eb519f13ddac3bc715a2d0f01b3cc','[\"*\"]','2023-11-15 08:05:07',NULL,'2023-11-15 07:54:55','2023-11-15 08:05:07'),
(45,'App\\Models\\User',9,'admin','9ed94e931399e6a154a1d2ec594d23a3e64a8b8d9ff4c59d7711160440965604','[\"*\"]','2023-11-15 08:13:08',NULL,'2023-11-15 08:11:52','2023-11-15 08:13:08'),
(46,'App\\Models\\User',9,'admin','3742b7b000903b9e36db0c736cd25367895f0fe756538d11e875a4a28d6eda0b','[\"*\"]','2023-11-15 08:34:02',NULL,'2023-11-15 08:25:00','2023-11-15 08:34:02'),
(47,'App\\Models\\User',10,'admin','58c9f3184aea83dc356d73c539d816e8ab5b80dafb35699bba57a969eec76995','[\"*\"]','2023-11-15 08:42:52',NULL,'2023-11-15 08:25:28','2023-11-15 08:42:52');
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `qa_feedback`
--

DROP TABLE IF EXISTS `qa_feedback`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `qa_feedback` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `exam_id` bigint(20) unsigned DEFAULT NULL,
  `course_objective_id` bigint(20) unsigned DEFAULT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `qa_feedback_exam_id_foreign` (`exam_id`),
  KEY `qa_feedback_course_objective_id_foreign` (`course_objective_id`),
  KEY `qa_feedback_created_by_foreign` (`created_by`),
  KEY `qa_feedback_updated_by_foreign` (`updated_by`),
  CONSTRAINT `qa_feedback_course_objective_id_foreign` FOREIGN KEY (`course_objective_id`) REFERENCES `course_objectives` (`id`),
  CONSTRAINT `qa_feedback_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `qa_feedback_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `qa_feedback_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `qa_feedback`
--

LOCK TABLES `qa_feedback` WRITE;
/*!40000 ALTER TABLE `qa_feedback` DISABLE KEYS */;
INSERT INTO `qa_feedback` VALUES
(1,1,NULL,'Very haswa bwana','2023-11-12 09:11:28','2023-11-12 09:11:53',1,1,1),
(2,1,NULL,'Very haswa bwana','2023-11-12 09:11:44','2023-11-12 09:11:44',1,NULL,1),
(3,1,NULL,'Very good','2023-11-13 07:34:37','2023-11-13 07:34:37',1,NULL,1),
(4,1,NULL,'Very good','2023-11-13 07:36:11','2023-11-13 07:36:11',1,NULL,1),
(5,1,NULL,'Very good','2023-11-13 07:36:36','2023-11-13 07:36:36',1,NULL,1),
(6,1,NULL,'Very good','2023-11-13 07:38:00','2023-11-13 07:38:00',1,NULL,1),
(7,1,NULL,'Very good','2023-11-13 07:38:32','2023-11-13 07:38:32',1,NULL,1),
(8,1,NULL,'Very good','2023-11-13 11:48:06','2023-11-13 11:48:06',1,NULL,1),
(9,1,NULL,'Sample maneno','2023-11-13 12:02:50','2023-11-13 12:02:50',4,NULL,1),
(10,NULL,1,'This is an intersting one','2023-11-13 12:03:32','2023-11-13 12:03:32',4,NULL,1),
(11,4,NULL,'Acturial hapa na pale','2023-11-13 12:07:30','2023-11-13 12:07:30',4,NULL,1);
/*!40000 ALTER TABLE `qa_feedback` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES
(1,'student',NULL,NULL),
(2,'coordinator',NULL,NULL),
(3,'administrator',NULL,NULL),
(4,'qa',NULL,NULL),
(5,'instructor',NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_enrolments`
--

DROP TABLE IF EXISTS `student_enrolments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_enrolments` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint(20) unsigned NOT NULL,
  `course_id` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_enrolments_student_id_course_id_unique` (`student_id`,`course_id`),
  KEY `student_enrolments_course_id_foreign` (`course_id`),
  KEY `student_enrolments_created_by_foreign` (`created_by`),
  KEY `student_enrolments_updated_by_foreign` (`updated_by`),
  CONSTRAINT `student_enrolments_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  CONSTRAINT `student_enrolments_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `student_enrolments_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  CONSTRAINT `student_enrolments_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_enrolments`
--

LOCK TABLES `student_enrolments` WRITE;
/*!40000 ALTER TABLE `student_enrolments` DISABLE KEYS */;
INSERT INTO `student_enrolments` VALUES
(1,1,1,'2023-11-12 01:44:36','2023-11-12 01:45:43',1,1,1),
(2,2,1,'2023-11-14 10:17:54','2023-11-14 10:17:54',1,NULL,1),
(3,2,2,'2023-11-14 10:41:36','2023-11-14 10:41:36',2,NULL,1);
/*!40000 ALTER TABLE `student_enrolments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_performances`
--

DROP TABLE IF EXISTS `student_performances`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_performances` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `student_id` bigint(20) unsigned NOT NULL,
  `exam_id` bigint(20) unsigned NOT NULL,
  `score` decimal(5,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE KEY `student_performances_student_id_exam_id_unique` (`student_id`,`exam_id`),
  KEY `student_performances_exam_id_foreign` (`exam_id`),
  KEY `student_performances_created_by_foreign` (`created_by`),
  KEY `student_performances_updated_by_foreign` (`updated_by`),
  CONSTRAINT `student_performances_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `student_performances_exam_id_foreign` FOREIGN KEY (`exam_id`) REFERENCES `exams` (`id`),
  CONSTRAINT `student_performances_student_id_foreign` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  CONSTRAINT `student_performances_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_performances`
--

LOCK TABLES `student_performances` WRITE;
/*!40000 ALTER TABLE `student_performances` DISABLE KEYS */;
INSERT INTO `student_performances` VALUES
(1,1,1,90.00,'2023-11-12 07:45:31','2023-11-12 07:53:11',1,1,1),
(2,1,3,82.00,'2023-11-12 07:49:39','2023-11-12 07:49:39',1,NULL,1),
(3,2,3,82.00,'2023-11-14 10:16:33','2023-11-14 10:16:33',1,NULL,1),
(4,1,4,43.00,'2023-11-14 14:22:46','2023-11-14 14:22:46',1,NULL,1),
(5,1,5,67.00,'2023-11-14 14:23:12','2023-11-14 14:23:12',1,NULL,1);
/*!40000 ALTER TABLE `student_performances` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tickets`
--

DROP TABLE IF EXISTS `tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tickets` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('Low','Medium','High') NOT NULL,
  `raised_by` bigint(20) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `tickets_raised_by_foreign` (`raised_by`),
  KEY `tickets_created_by_foreign` (`created_by`),
  KEY `tickets_updated_by_foreign` (`updated_by`),
  CONSTRAINT `tickets_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_raised_by_foreign` FOREIGN KEY (`raised_by`) REFERENCES `users` (`id`),
  CONSTRAINT `tickets_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tickets`
--

LOCK TABLES `tickets` WRITE;
/*!40000 ALTER TABLE `tickets` DISABLE KEYS */;
INSERT INTO `tickets` VALUES
(1,'Chelsea vs City','Ticket ya hapa na pale haiko vile inafaa','High',1,'2023-11-12 08:47:06','2023-11-13 14:41:38',1,5,0),
(2,'Ticket Moja','Ticket ya hapa na pale haiko vile inafaa','High',1,'2023-11-13 14:08:48','2023-11-13 14:39:30',1,5,1),
(3,'Nayo nayo','Nayo nayo','Medium',5,'2023-11-13 14:15:30','2023-11-13 14:39:30',5,5,1),
(4,'Okay, basi','Basi nayo nayo','Medium',5,'2023-11-13 14:16:55','2023-11-13 14:39:30',5,5,1),
(5,'Nelly Teren Teren','Teren Teren','Medium',5,'2023-11-13 14:19:11','2023-11-13 14:39:30',5,5,1),
(6,'Sample Ticket','Ticket mfano','Medium',5,'2023-11-14 14:29:19','2023-11-14 14:32:02',5,5,0);
/*!40000 ALTER TABLE `tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(15) NOT NULL,
  `identification_number` varchar(50) NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `updated_by` bigint(20) unsigned DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT 1,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_identification_number_unique` (`identification_number`),
  KEY `users_role_id_foreign` (`role_id`),
  KEY `users_created_by_foreign` (`created_by`),
  KEY `users_updated_by_foreign` (`updated_by`),
  CONSTRAINT `users_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`),
  CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`),
  CONSTRAINT `users_updated_by_foreign` FOREIGN KEY (`updated_by`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Wesley Dexter','delaney','delaney@gmail.com',NULL,'$2y$12$3ZOKBA429m8d4aFRqWW9oO1J73hC3VimoIyfB8E7Ly/xiNFUNEO5.','0789089089','89089',5,NULL,5,1,NULL,'2023-11-11 11:37:55','2023-11-13 14:59:39'),
(2,'Baraka Mwinisheshe','mwinisheshe','mwinisheshe@gmail.com',NULL,'$2y$12$HD5l8Vl4ZDSRRoKJQMh/guHf2nb/N5Szc3OjjBjIxF4NbRE9phTue','0712312389','890002',1,NULL,5,0,NULL,'2023-11-11 19:25:51','2023-11-14 11:19:51'),
(3,'Sammy Lubengo','lubengo','lubengo@gmail.com',NULL,'$2y$12$6IPyKZRjzL3g0JOvNxbwOuiGlt1oafDJ7EYKpHl7NZjYwm7wCSA/y','0789089089','9432423',2,NULL,5,0,NULL,'2023-11-13 07:21:02','2023-11-14 14:34:27'),
(4,'Beryl','beryl','beryl@gmail.com',NULL,'$2y$12$poPSRJbHmH3B0h7M4IFlk.OO8NNE12fKWSuaQnX6EGhhwA.iPS/J6','0789089023','432432123',4,NULL,NULL,1,NULL,'2023-11-13 11:01:57','2023-11-13 11:01:57'),
(5,'Nderu','nderu','nderu@gmail.com',NULL,'$2y$12$ONwdM9MW1fN1h2qwamHFzu3LhNlfRMqYJEhJf9hq245npGPHcH2Vi','0789089054','67867932',3,NULL,NULL,1,NULL,'2023-11-13 12:11:24','2023-11-13 12:11:24'),
(6,'Kelly','kelly','kelly@gmail.com',NULL,'$2y$12$iwPP91mG0CjrYKxGmeGmJeoney8IPighF51S5F5MEadOhAfW8KPzy','0712343255','3954353',2,NULL,NULL,1,NULL,'2023-11-13 15:06:21','2023-11-13 15:06:21'),
(7,'Betty','betty','betty@gmail.com',NULL,'$2y$12$vsVIYfHXXTPpCbmugIWUEucIEINxEHyBqHIC5riHmeA/aYFWrPsiO','07123789455','43254235',4,NULL,NULL,1,NULL,'2023-11-13 17:19:22','2023-11-13 17:19:22'),
(8,'Irene','irene','irene@gmail.com',NULL,'$2y$12$UNuM8XqUbTw3jQatHR.lNeHIOggrWDwD2NZMFdYjDj4EqxUYCoqIW','0789898932','423432234',2,NULL,NULL,1,NULL,'2023-11-13 17:25:36','2023-11-13 17:25:36'),
(9,'Katrina','katrina','katrina@gmail.com',NULL,'$2y$12$/t2nYsRpeA2bCArVplbRlO.BWMjciAMW8g9yYzqVLtUm5ye3gPHre','0712312321','743289423',5,NULL,NULL,1,NULL,'2023-11-13 17:29:22','2023-11-13 17:29:22'),
(10,'Ndindi','ndindi','ndindi@gmail.com',NULL,'$2y$12$SKspHL/1fIxx10oi86eGwuVmaod1IMZpOCNc9.k2IHX01imxiiT0u','0712312384','3242324',2,NULL,NULL,1,NULL,'2023-11-13 17:37:39','2023-11-13 17:37:39'),
(11,'Trisha Kay','kayT','kayt@gmail.com',NULL,'$2y$12$X2rTzG/hHvNN2ClaV9kyI.8ijhnr4J7UDPmwmF2qLWBYqu3MhOnA2','0789032132','2342354',4,NULL,NULL,1,NULL,'2023-11-14 14:37:41','2023-11-14 14:37:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-14 23:30:28
