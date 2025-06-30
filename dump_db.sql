-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: camisetas_db
-- ------------------------------------------------------
-- Server version	8.0.29

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `FK2pojw9weqmkc0476cs86vyyrb` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `artista`
--

DROP TABLE IF EXISTS `artista`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `artista` (
  `ganancias_totales` int DEFAULT NULL,
  `administrador_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL,
  `id_catalogo` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKaebvn2t26hrjvyrl8gly4xf84` (`id_catalogo`),
  KEY `FK4gvwkstu5nibqa2i4yx8jabt8` (`administrador_id`),
  CONSTRAINT `FK4gvwkstu5nibqa2i4yx8jabt8` FOREIGN KEY (`administrador_id`) REFERENCES `administrador` (`id`),
  CONSTRAINT `FKb2nfwf9oyd26vs1dl43j353f7` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`),
  CONSTRAINT `FKotgvasbmrvnlpko7922hflvge` FOREIGN KEY (`id_catalogo`) REFERENCES `catologo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `artista`
--

LOCK TABLES `artista` WRITE;
/*!40000 ALTER TABLE `artista` DISABLE KEYS */;
/*!40000 ALTER TABLE `artista` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camiseta`
--

DROP TABLE IF EXISTS `camiseta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camiseta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `precio` double DEFAULT NULL,
  `talla` tinyint DEFAULT NULL,
  `stock_id` bigint DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `material` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6g67fyutsxiqt1khr87dpu7wv` (`stock_id`),
  CONSTRAINT `FK6g67fyutsxiqt1khr87dpu7wv` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camiseta`
--

LOCK TABLES `camiseta` WRITE;
/*!40000 ALTER TABLE `camiseta` DISABLE KEYS */;
/*!40000 ALTER TABLE `camiseta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camiseta_estampada`
--

DROP TABLE IF EXISTS `camiseta_estampada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camiseta_estampada` (
  `camiseta_id` int DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `item_carrito_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsykootfncpols90ifdjnqg3el` (`camiseta_id`),
  KEY `FKano9dr5sye9t6kkxksw3mmuj7` (`item_carrito_id`),
  CONSTRAINT `FKano9dr5sye9t6kkxksw3mmuj7` FOREIGN KEY (`item_carrito_id`) REFERENCES `item_carrito` (`id`),
  CONSTRAINT `FKsykootfncpols90ifdjnqg3el` FOREIGN KEY (`camiseta_id`) REFERENCES `camiseta` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camiseta_estampada`
--

LOCK TABLES `camiseta_estampada` WRITE;
/*!40000 ALTER TABLE `camiseta_estampada` DISABLE KEYS */;
/*!40000 ALTER TABLE `camiseta_estampada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `camiseta_estampada_estampas`
--

DROP TABLE IF EXISTS `camiseta_estampada_estampas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `camiseta_estampada_estampas` (
  `camiseta_estampada_id` bigint NOT NULL,
  `estampa_id` bigint NOT NULL,
  `estampas_aplicadas_id` bigint NOT NULL,
  PRIMARY KEY (`camiseta_estampada_id`,`estampa_id`),
  KEY `FKgwolhe4not2baygap06kfewx1` (`estampas_aplicadas_id`),
  KEY `FKa8u29m0efovxs3otbhkw5rxam` (`estampa_id`),
  CONSTRAINT `FKa8u29m0efovxs3otbhkw5rxam` FOREIGN KEY (`estampa_id`) REFERENCES `estampa` (`id`),
  CONSTRAINT `FKgwolhe4not2baygap06kfewx1` FOREIGN KEY (`estampas_aplicadas_id`) REFERENCES `props_estampada_aplicada` (`id`),
  CONSTRAINT `FKj4psppgdu02r8majyvdthwi10` FOREIGN KEY (`camiseta_estampada_id`) REFERENCES `camiseta_estampada` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `camiseta_estampada_estampas`
--

LOCK TABLES `camiseta_estampada_estampas` WRITE;
/*!40000 ALTER TABLE `camiseta_estampada_estampas` DISABLE KEYS */;
/*!40000 ALTER TABLE `camiseta_estampada_estampas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carrito`
--

DROP TABLE IF EXISTS `carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carrito` (
  `total_carrito` decimal(38,2) DEFAULT NULL,
  `vigencia` int NOT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrito`
--

LOCK TABLES `carrito` WRITE;
/*!40000 ALTER TABLE `carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catologo`
--

DROP TABLE IF EXISTS `catologo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `catologo` (
  `fecha_creacion` date DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catologo`
--

LOCK TABLES `catologo` WRITE;
/*!40000 ALTER TABLE `catologo` DISABLE KEYS */;
/*!40000 ALTER TABLE `catologo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `administrador_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKl13b4gycsv8lulicv9h50waep` (`administrador_id`),
  CONSTRAINT `FKl13b4gycsv8lulicv9h50waep` FOREIGN KEY (`administrador_id`) REFERENCES `administrador` (`id`),
  CONSTRAINT `FKsitxst8o302fspskxfjatuyrl` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estampa`
--

DROP TABLE IF EXISTS `estampa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estampa` (
  `estado` tinyint(1) DEFAULT NULL,
  `precio_base` decimal(38,2) NOT NULL,
  `rating` int NOT NULL,
  `catalogo_id` bigint DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `tema` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6yx66fhsxikw756bg4qf2ihi3` (`catalogo_id`),
  CONSTRAINT `FK6yx66fhsxikw756bg4qf2ihi3` FOREIGN KEY (`catalogo_id`) REFERENCES `catologo` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estampa`
--

LOCK TABLES `estampa` WRITE;
/*!40000 ALTER TABLE `estampa` DISABLE KEYS */;
/*!40000 ALTER TABLE `estampa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagen`
--

DROP TABLE IF EXISTS `imagen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagen` (
  `estampa_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmrmfp6yfiwl6jnq5mcg77c6vf` (`estampa_id`),
  CONSTRAINT `FKmrmfp6yfiwl6jnq5mcg77c6vf` FOREIGN KEY (`estampa_id`) REFERENCES `estampa` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagen`
--

LOCK TABLES `imagen` WRITE;
/*!40000 ALTER TABLE `imagen` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item_carrito`
--

DROP TABLE IF EXISTS `item_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `item_carrito` (
  `cantidad` int NOT NULL,
  `carrito_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FK7jlhnuuh4m7q1cn77xhtx9kdq` (`carrito_id`),
  CONSTRAINT `FK7jlhnuuh4m7q1cn77xhtx9kdq` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item_carrito`
--

LOCK TABLES `item_carrito` WRITE;
/*!40000 ALTER TABLE `item_carrito` DISABLE KEYS */;
/*!40000 ALTER TABLE `item_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `metodos_pago` tinyint DEFAULT NULL,
  `cedula` bigint NOT NULL,
  `fecha_transaccion` date NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pedido_id` bigint DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `id_transaccion` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `plataforma` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKfxo25lxg6k2xtgoe4pf778vme` (`cedula`),
  UNIQUE KEY `UKcjukh0gqou26iq8ro20j829ug` (`pedido_id`),
  CONSTRAINT `FK8fojprqy7kv7k3d192m91e027` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`),
  CONSTRAINT `pago_chk_1` CHECK ((`metodos_pago` between 0 and 1))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
  `fecha` date DEFAULT NULL,
  `carrito_id` bigint DEFAULT NULL,
  `cliente_id` bigint DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `pago_id` bigint DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKgp9s4gjp7tfy466wmmrfqoydg` (`carrito_id`),
  UNIQUE KEY `UKfibo078ch1xjrp3bcq4piov4e` (`pago_id`),
  KEY `FK30s8j2ktpay6of18lbyqn3632` (`cliente_id`),
  CONSTRAINT `FK30s8j2ktpay6of18lbyqn3632` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  CONSTRAINT `FK78e8injhefpm6130ipsi1bj2n` FOREIGN KEY (`carrito_id`) REFERENCES `carrito` (`id`),
  CONSTRAINT `FKkcpitr7lxw3ky3oaqmlqit7d1` FOREIGN KEY (`pago_id`) REFERENCES `pago` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `props_estampada_aplicada`
--

DROP TABLE IF EXISTS `props_estampada_aplicada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `props_estampada_aplicada` (
  `coordx` float NOT NULL,
  `coordy` float NOT NULL,
  `tamano` float NOT NULL,
  `camiseta_estampada_id` bigint NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  KEY `FKnv2xxg30ujly1jt3gnljeaogt` (`camiseta_estampada_id`),
  CONSTRAINT `FKnv2xxg30ujly1jt3gnljeaogt` FOREIGN KEY (`camiseta_estampada_id`) REFERENCES `camiseta_estampada` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `props_estampada_aplicada`
--

LOCK TABLES `props_estampada_aplicada` WRITE;
/*!40000 ALTER TABLE `props_estampada_aplicada` DISABLE KEYS */;
/*!40000 ALTER TABLE `props_estampada_aplicada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proveedor` (
  `cantidad_disponible` int NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `stock_id` bigint DEFAULT NULL,
  `tiempo_entrega_estimado` bigint NOT NULL,
  `nombre_proveedor` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK438un7bx0kw7j9e9c7nqgwph5` (`nombre_proveedor`),
  KEY `FK66bm4k0036337rlx6ojtoyc5m` (`stock_id`),
  CONSTRAINT `FK66bm4k0036337rlx6ojtoyc5m` FOREIGN KEY (`stock_id`) REFERENCES `stock` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proveedor`
--

LOCK TABLES `proveedor` WRITE;
/*!40000 ALTER TABLE `proveedor` DISABLE KEYS */;
/*!40000 ALTER TABLE `proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stock`
--

DROP TABLE IF EXISTS `stock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stock` (
  `capacidad` int NOT NULL,
  `fecha_ultima_actualizacion` date NOT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stock`
--

LOCK TABLES `stock` WRITE;
/*!40000 ALTER TABLE `stock` DISABLE KEYS */;
/*!40000 ALTER TABLE `stock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `fecha_registro` date DEFAULT NULL,
  `id` bigint NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`),
  UNIQUE KEY `UKcto7dkti4t38iq8r4cqesbd8k` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-27 23:06:41
