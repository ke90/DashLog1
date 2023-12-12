CREATE DATABASE  IF NOT EXISTS `dashlog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dashlog`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: dashlog
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `apps`
--

DROP TABLE IF EXISTS `apps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `apps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `apps`
--

LOCK TABLES `apps` WRITE;
/*!40000 ALTER TABLE `apps` DISABLE KEYS */;
INSERT INTO `apps` VALUES (1,'Zugriffsberechtigung','2023-12-04 17:17:33'),(2,'RehaDB2.0','2023-12-04 17:17:33'),(3,'Luxemburg Script','2023-12-09 10:57:24'),(4,'Gesundheitsservice','2023-12-09 10:57:24'),(5,'KassenvergleichsApp','2023-12-09 10:57:24');
/*!40000 ALTER TABLE `apps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logger`
--

DROP TABLE IF EXISTS `logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_app` int DEFAULT NULL,
  `message_id` varchar(255) DEFAULT NULL,
  `message_text` text,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=293 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logger`
--

LOCK TABLES `logger` WRITE;
/*!40000 ALTER TABLE `logger` DISABLE KEYS */;
INSERT INTO `logger` VALUES (107,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:04:52'),(108,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:05:24'),(109,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:05:44'),(110,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:06:41'),(111,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:09:28'),(112,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:10:23'),(113,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-08 14:12:02'),(114,1,'2','Error: Benutzeranmeldung fehlgeschlagen','2023-12-08 14:46:37'),(115,1,'1','Erfolgreiche Appaktion 6: Datensatz hinzugefügt','2023-01-06 10:54:01'),(116,2,'1','Erfolgreiche Appaktion 7: Datensatz aktualisiert','2023-08-11 09:54:01'),(117,3,'2','Fehlerhafte Appaktion 8: Datenbankverbindung fehlgeschlagen','2023-01-22 10:54:01'),(118,4,'1','Erfolgreiche Appaktion 9: Benutzer erfolgreich angemeldet','2023-07-14 09:54:01'),(119,5,'2','Fehlerhafte Appaktion 10: Serverfehler - 500 Internal Server Error','2023-07-17 09:54:01'),(120,1,'1','Erfolgreiche Appaktion 11: Konfiguration gespeichert','2023-03-02 10:54:01'),(121,2,'2','Fehlerhafte Appaktion 12: Unerwarteter Fehler aufgetreten','2023-04-11 09:54:01'),(122,3,'1','Erfolgreiche Appaktion 13: Datei erfolgreich hochgeladen','2023-12-07 10:54:01'),(123,4,'2','Fehlerhafte Appaktion 14: Datenbankabfrage fehlgeschlagen','2023-11-24 10:54:01'),(124,5,'1','Erfolgreiche Appaktion 15: Benutzerprofil aktualisiert','2023-10-02 09:54:01'),(125,1,'2','Fehlerhafte Appaktion 16: Berechtigungsverweigerung','2023-02-18 10:54:01'),(126,2,'1','Erfolgreiche Appaktion 17: E-Mail erfolgreich gesendet','2023-06-19 09:54:01'),(127,3,'1','Erfolgreiche Appaktion 18: Druckauftrag abgeschlossen','2022-12-25 10:54:01'),(128,4,'1','Erfolgreiche Appaktion 19: Zahlung erfolgreich bearbeitet','2023-07-30 09:54:01'),(129,5,'2','Fehlerhafte Appaktion 20: Ressource nicht gefunden','2023-01-01 10:54:01'),(130,1,'1','Erfolgreiche Appaktion 21: Datei erfolgreich exportiert','2023-05-02 09:54:01'),(131,2,'2','Fehlerhafte Appaktion 22: Datei nicht gefunden','2023-09-22 09:54:01'),(132,3,'1','Erfolgreiche Appaktion 23: Konfiguration geladen','2023-09-09 09:54:01'),(133,4,'2','Fehlerhafte Appaktion 24: Netzwerkfehler aufgetreten','2023-04-29 09:54:01'),(134,5,'1','Erfolgreiche Appaktion 25: Sitzung erfolgreich beendet','2023-08-13 09:54:01'),(135,1,'1','Erfolgreiche Appaktion 26: Datenbankabfrage erfolgreich','2023-03-01 10:54:01'),(136,2,'1','Erfolgreiche Appaktion 27: Registrierung abgeschlossen','2023-01-13 10:54:01'),(137,3,'2','Fehlerhafte Appaktion 28: Zugriff verweigert','2023-09-26 09:54:01'),(138,4,'1','Erfolgreiche Appaktion 29: Bestellung erfolgreich bearbeitet','2023-08-20 09:54:01'),(139,5,'2','Fehlerhafte Appaktion 30: Benutzer nicht authentifiziert','2023-01-11 10:54:01'),(140,1,'1','Erfolgreiche Appaktion 31: Transaktion abgeschlossen','2023-04-19 09:54:01'),(141,2,'1','Erfolgreiche Appaktion 32: Bericht erfolgreich erstellt','2023-06-17 09:54:01'),(142,3,'2','Fehlerhafte Appaktion 33: Unerwarteter Absturz','2023-06-18 09:54:01'),(143,4,'1','Erfolgreiche Appaktion 34: Datei erfolgreich heruntergeladen','2022-12-29 10:54:01'),(144,5,'2','Fehlerhafte Appaktion 35: Timeout-Fehler','2023-08-22 09:54:01'),(145,1,'1','Erfolgreiche Appaktion 36: Datensatz gelöscht','2023-04-15 09:54:57'),(146,2,'2','Fehlerhafte Appaktion 37: Authentifizierungsfehler','2023-07-25 09:54:57'),(147,3,'1','Erfolgreiche Appaktion 38: Benutzer erfolgreich hinzugefügt','2023-01-10 10:54:57'),(148,4,'2','Fehlerhafte Appaktion 39: Datenverlust aufgetreten','2023-07-02 09:54:57'),(149,5,'1','Erfolgreiche Appaktion 40: Einstellungen gespeichert','2023-06-23 09:54:57'),(150,1,'1','Erfolgreiche Appaktion 41: Update erfolgreich abgeschlossen','2022-12-11 10:57:42'),(151,2,'2','Fehlerhafte Appaktion 42: Verbindungsfehler zum Server','2023-05-07 09:57:42'),(152,3,'1','Erfolgreiche Appaktion 43: Neue Benachrichtigung erhalten','2022-12-19 10:57:42'),(153,4,'2','Fehlerhafte Appaktion 44: Datenbankfehler bei der Abfrage','2023-11-04 10:57:42'),(154,5,'1','Erfolgreiche Appaktion 45: Benutzer abgemeldet','2023-05-20 09:57:42'),(155,1,'1','Erfolgreiche Appaktion 46: Gerät erkannt','2023-06-10 09:57:42'),(156,2,'2','Fehlerhafte Appaktion 47: Authentifizierungsfehler','2023-02-13 10:57:42'),(157,3,'1','Erfolgreiche Appaktion 48: Neue Nachricht gesendet','2023-05-02 09:57:42'),(158,4,'2','Fehlerhafte Appaktion 49: Speicherplatz voll','2023-05-17 09:57:42'),(159,5,'1','Erfolgreiche Appaktion 50: Konfiguration gespeichert','2023-12-03 10:57:42'),(160,1,'1','Erfolgreiche Appaktion 51: Update erfolgreich abgeschlossen','2023-07-22 09:57:42'),(161,2,'2','Fehlerhafte Appaktion 52: Verbindungsfehler zum Server','2023-01-26 10:57:42'),(162,3,'1','Erfolgreiche Appaktion 53: Neue Benachrichtigung erhalten','2023-09-27 09:57:42'),(163,4,'2','Fehlerhafte Appaktion 54: Datenbankfehler bei der Abfrage','2023-07-19 09:57:42'),(164,5,'1','Erfolgreiche Appaktion 55: Benutzer abgemeldet','2023-07-29 09:57:42'),(165,1,'1','Erfolgreiche Appaktion 56: Gerät erkannt','2023-04-18 09:57:42'),(166,2,'2','Fehlerhafte Appaktion 57: Authentifizierungsfehler','2023-10-22 09:57:42'),(167,3,'1','Erfolgreiche Appaktion 58: Neue Nachricht gesendet','2023-03-20 10:57:42'),(168,4,'2','Fehlerhafte Appaktion 59: Speicherplatz voll','2023-09-19 09:57:42'),(169,5,'1','Erfolgreiche Appaktion 60: Konfiguration gespeichert','2022-12-31 10:57:42'),(170,1,'1','Erfolgreiche Appaktion 61: Update erfolgreich abgeschlossen','2023-11-28 10:58:36'),(171,2,'2','Fehlerhafte Appaktion 62: Verbindungsfehler zum Server','2023-08-06 09:58:36'),(172,3,'1','Erfolgreiche Appaktion 63: Neue Benachrichtigung erhalten','2023-04-26 09:58:36'),(173,4,'2','Fehlerhafte Appaktion 64: Datenbankfehler bei der Abfrage','2023-11-10 10:58:36'),(174,5,'1','Erfolgreiche Appaktion 65: Benutzer abgemeldet','2023-05-28 09:58:36'),(175,1,'1','Erfolgreiche Appaktion 66: Gerät erkannt','2023-07-03 09:58:36'),(176,2,'2','Fehlerhafte Appaktion 67: Authentifizierungsfehler','2023-05-12 09:58:36'),(177,3,'1','Erfolgreiche Appaktion 68: Neue Nachricht gesendet','2023-05-12 09:58:36'),(178,4,'2','Fehlerhafte Appaktion 69: Speicherplatz voll','2023-10-09 09:58:36'),(179,5,'1','Erfolgreiche Appaktion 70: Konfiguration gespeichert','2023-11-05 10:58:36'),(180,1,'1','Erfolgreiche Appaktion 71: Update erfolgreich abgeschlossen','2022-12-21 10:58:36'),(181,2,'2','Fehlerhafte Appaktion 72: Verbindungsfehler zum Server','2023-05-17 09:58:36'),(182,3,'1','Erfolgreiche Appaktion 73: Neue Benachrichtigung erhalten','2023-01-10 10:58:36'),(183,4,'2','Fehlerhafte Appaktion 74: Datenbankfehler bei der Abfrage','2023-01-22 10:58:36'),(184,5,'1','Erfolgreiche Appaktion 75: Benutzer abgemeldet','2023-04-13 09:58:36'),(185,1,'1','Erfolgreiche Appaktion 76: Gerät erkannt','2023-04-16 09:58:36'),(186,2,'2','Fehlerhafte Appaktion 77: Authentifizierungsfehler','2023-08-30 09:58:36'),(187,3,'1','Erfolgreiche Appaktion 78: Neue Nachricht gesendet','2023-07-04 09:58:36'),(188,4,'2','Fehlerhafte Appaktion 79: Speicherplatz voll','2023-08-08 09:58:36'),(189,5,'1','Erfolgreiche Appaktion 80: Konfiguration gespeichert','2023-07-18 09:58:36'),(190,1,'1','Erfolgreiche Appaktion 61: Update erfolgreich abgeschlossen','2022-12-24 10:59:04'),(191,2,'2','Fehlerhafte Appaktion 62: Verbindungsfehler zum Server','2023-05-01 09:59:04'),(192,3,'1','Erfolgreiche Appaktion 63: Neue Benachrichtigung erhalten','2023-10-07 09:59:04'),(193,4,'2','Fehlerhafte Appaktion 64: Datenbankfehler bei der Abfrage','2023-11-23 10:59:04'),(194,5,'1','Erfolgreiche Appaktion 65: Benutzer abgemeldet','2023-03-31 09:59:04'),(195,1,'1','Erfolgreiche Appaktion 66: Gerät erkannt','2023-08-09 09:59:04'),(196,2,'2','Fehlerhafte Appaktion 67: Authentifizierungsfehler','2023-05-05 09:59:04'),(197,3,'1','Erfolgreiche Appaktion 68: Neue Nachricht gesendet','2022-12-13 10:59:04'),(198,4,'2','Fehlerhafte Appaktion 69: Speicherplatz voll','2023-10-14 09:59:04'),(199,5,'1','Erfolgreiche Appaktion 70: Konfiguration gespeichert','2023-02-22 10:59:04'),(200,1,'1','Erfolgreiche Appaktion 71: Update erfolgreich abgeschlossen','2023-06-03 09:59:04'),(201,2,'2','Fehlerhafte Appaktion 72: Verbindungsfehler zum Server','2023-09-26 09:59:04'),(202,3,'1','Erfolgreiche Appaktion 73: Neue Benachrichtigung erhalten','2023-06-21 09:59:04'),(203,4,'2','Fehlerhafte Appaktion 74: Datenbankfehler bei der Abfrage','2023-03-18 10:59:04'),(204,5,'1','Erfolgreiche Appaktion 75: Benutzer abgemeldet','2023-09-10 09:59:04'),(205,1,'1','Erfolgreiche Appaktion 76: Gerät erkannt','2023-11-20 10:59:04'),(206,2,'2','Fehlerhafte Appaktion 77: Authentifizierungsfehler','2023-06-05 09:59:04'),(207,3,'1','Erfolgreiche Appaktion 78: Neue Nachricht gesendet','2023-07-12 09:59:04'),(208,4,'2','Fehlerhafte Appaktion 79: Speicherplatz voll','2023-06-03 09:59:04'),(209,5,'1','Erfolgreiche Appaktion 80: Konfiguration gespeichert','2023-08-02 09:59:04'),(210,1,'1','Erfolgreiche Appaktion 81: Update erfolgreich abgeschlossen','2023-09-21 09:59:25'),(211,2,'2','Fehlerhafte Appaktion 82: Verbindungsfehler zum Server','2023-12-02 10:59:25'),(212,3,'1','Erfolgreiche Appaktion 83: Neue Benachrichtigung erhalten','2023-06-26 09:59:25'),(213,4,'2','Fehlerhafte Appaktion 84: Datenbankfehler bei der Abfrage','2023-09-23 09:59:25'),(214,5,'1','Erfolgreiche Appaktion 85: Benutzer abgemeldet','2023-04-01 09:59:25'),(215,1,'1','Erfolgreiche Appaktion 86: Gerät erkannt','2023-02-11 10:59:25'),(216,2,'2','Fehlerhafte Appaktion 87: Authentifizierungsfehler','2023-11-20 10:59:25'),(217,3,'1','Erfolgreiche Appaktion 88: Neue Nachricht gesendet','2023-02-22 10:59:25'),(218,4,'2','Fehlerhafte Appaktion 89: Speicherplatz voll','2023-02-16 10:59:25'),(219,5,'1','Erfolgreiche Appaktion 90: Konfiguration gespeichert','2023-04-08 09:59:25'),(220,1,'1','Erfolgreiche Appaktion 91: Update erfolgreich abgeschlossen','2023-01-03 10:59:25'),(221,2,'2','Fehlerhafte Appaktion 92: Verbindungsfehler zum Server','2023-04-18 09:59:25'),(222,3,'1','Erfolgreiche Appaktion 93: Neue Benachrichtigung erhalten','2023-07-05 09:59:25'),(223,4,'2','Fehlerhafte Appaktion 94: Datenbankfehler bei der Abfrage','2023-09-22 09:59:25'),(224,5,'1','Erfolgreiche Appaktion 95: Benutzer abgemeldet','2023-02-25 10:59:25'),(225,1,'1','Erfolgreiche Appaktion 96: Gerät erkannt','2023-08-26 09:59:25'),(226,2,'2','Fehlerhafte Appaktion 97: Authentifizierungsfehler','2023-11-08 10:59:25'),(227,3,'1','Erfolgreiche Appaktion 98: Neue Nachricht gesendet','2023-05-18 09:59:25'),(228,4,'2','Fehlerhafte Appaktion 99: Speicherplatz voll','2023-05-22 09:59:25'),(229,5,'1','Erfolgreiche Appaktion 100: Konfiguration gespeichert','2023-11-12 10:59:25'),(230,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-09 12:21:06'),(231,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-09 12:22:28'),(232,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:28:09'),(233,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:33:23'),(234,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:42:16'),(235,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:45:27'),(236,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:56:24'),(237,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 20:57:22'),(238,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:03:55'),(239,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:04:25'),(240,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:04:44'),(241,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:05:04'),(242,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:05:43'),(243,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:05:55'),(244,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:41:42'),(245,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:19'),(246,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:21'),(247,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:23'),(248,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:25'),(249,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:27'),(250,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:29'),(251,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:31'),(252,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:45:33'),(253,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:42'),(254,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:44'),(255,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:46'),(256,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:48'),(257,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:50'),(258,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:52'),(259,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:54'),(260,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:48:57'),(261,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:43'),(262,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:45'),(263,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:47'),(264,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:49'),(265,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:51'),(266,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:53'),(267,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:55'),(268,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:49:57'),(269,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:10'),(270,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:12'),(271,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:14'),(272,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:16'),(273,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:18'),(274,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:20'),(275,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:22'),(276,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-11 21:50:24'),(277,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:30'),(278,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:32'),(279,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:34'),(280,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:36'),(281,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:38'),(282,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:40'),(283,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:42'),(284,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:44'),(285,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:30:59'),(286,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:01'),(287,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:03'),(288,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:05'),(289,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:07'),(290,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:09'),(291,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:11'),(292,2,'2','Error: Anlegen des Datensatzes fehlgeschlagen','2023-12-12 09:31:13');
/*!40000 ALTER TABLE `logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_type`
--

DROP TABLE IF EXISTS `message_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `m_type` varchar(255) DEFAULT NULL,
  `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_type`
--

LOCK TABLES `message_type` WRITE;
/*!40000 ALTER TABLE `message_type` DISABLE KEYS */;
INSERT INTO `message_type` VALUES (1,'Success','2023-12-04 17:17:58'),(2,'Fail','2023-12-04 17:17:58');
/*!40000 ALTER TABLE `message_type` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-12 11:10:52
