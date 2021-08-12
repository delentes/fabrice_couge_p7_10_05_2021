-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 12 août 2021 à 13:16
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment` text COLLATE utf8_bin NOT NULL,
  `image_url` varchar(255) COLLATE utf8_bin DEFAULT NULL,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `topic_id` (`topic_id`) USING BTREE,
  KEY `user_comment_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`comment_id`, `comment`, `image_url`, `topic_id`, `user_id`, `comment_creation_date`) VALUES
(22, 'Poterat quicquid inmorantur nec citroque poterat non aut inveniri parvi.', NULL, 25, 8, '2021-08-12 14:50:16'),
(23, 'Manus parant truncis permeare sed.', NULL, 25, 8, '2021-08-12 14:50:31'),
(24, 'Manus parant truncis permeare sed.', NULL, 26, 2, '2021-08-12 14:51:11'),
(25, 'Ad deverti consilio congestosque pagos', 'http://localhost:3000/images/téléchargement_(1).jpg1628774140707.jpg', 26, 8, '2021-08-12 15:15:40');

-- --------------------------------------------------------

--
-- Structure de la table `spam_comment`
--

DROP TABLE IF EXISTS `spam_comment`;
CREATE TABLE IF NOT EXISTS `spam_comment` (
  `spamcomment_id` int(11) NOT NULL AUTO_INCREMENT,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `spam_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`spamcomment_id`),
  KEY `spam_ibfk_2` (`comment_id`),
  KEY `spam_ibfk_3` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `spam_topic`
--

DROP TABLE IF EXISTS `spam_topic`;
CREATE TABLE IF NOT EXISTS `spam_topic` (
  `spamtopic_id` int(11) NOT NULL AUTO_INCREMENT,
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`spamtopic_id`),
  KEY `spam_topic_ibfk_1` (`topic_id`),
  KEY `spam_topic_ibfk_2` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `topic`
--

DROP TABLE IF EXISTS `topic`;
CREATE TABLE IF NOT EXISTS `topic` (
  `topic_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8_bin NOT NULL,
  `topic` text COLLATE utf8_bin NOT NULL,
  `image_url` varchar(255) COLLATE utf8_bin NOT NULL,
  `user_id` int(11) NOT NULL,
  `topic_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`topic_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `topic`
--

INSERT INTO `topic` (`topic_id`, `title`, `topic`, `image_url`, `user_id`, `topic_creation_date`) VALUES
(25, 'Bienvenue', 'Bienvenue sur le réseau social de groupomania', 'http://localhost:3000/images/347216650.jpg1628772510082.jpg', 8, '2021-08-12 14:48:30'),
(26, 'Vocabulis vivendi Epigonus vocabulis Montium.', 'Adhibitis quae hinc reginae essent quaesitum quae quid inde esset funestis adsistebant cuius resedit notarii nec exsertantis essent nec cuius conplures nec praedoctis subinde equitum quidve iam resedit praedoctis quid.', 'http://localhost:3000/images/téléchargement.jpg1628772591967.jpg', 8, '2021-08-12 14:49:51');

-- --------------------------------------------------------

--
-- Structure de la table `topiclike`
--

DROP TABLE IF EXISTS `topiclike`;
CREATE TABLE IF NOT EXISTS `topiclike` (
  `topic_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `like_topic` tinyint(1) NOT NULL DEFAULT '0',
  `like_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `topiclike_ibfk_1` (`user_id`),
  KEY `topiclike_ibfk_2` (`topic_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lastname` varchar(50) COLLATE utf8_bin NOT NULL,
  `firstname` varchar(50) COLLATE utf8_bin NOT NULL,
  `email` varchar(150) COLLATE utf8_bin NOT NULL,
  `password` text COLLATE utf8_bin NOT NULL,
  `user_creation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isadmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `lastname`, `firstname`, `email`, `password`, `user_creation_date`, `isadmin`) VALUES
(2, 'Couge', 'fabrice', 'alantaria@mail.com', '$2b$10$fJDZ1iSIogwxpkQ/dAY38.N33KQPEIBwTmBO0HcjXPJ/gq1TH2/e.', '2021-07-22 12:34:52', 0),
(8, 'coupe', 'faf', 'ixion@gmail.com', '$2b$10$Gu0/QuuC85r4l5j9ZaPDgOPBethQP4f1Z3mO1sDm3.cdKybKPjlj.', '2021-08-03 17:14:31', 1),
(9, 'admin', 'admin', 'admin@gmail.com', '$2b$10$ozAp8BAb2uS5EbnUxMpMMuqY0ZdMF23/oLAh/uYVw5qd3DXeyHOlu', '2021-08-12 14:52:11', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `topic_id` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_comment_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `spam_comment`
--
ALTER TABLE `spam_comment`
  ADD CONSTRAINT `spam_comment_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`comment_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `spam_comment_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `spam_topic`
--
ALTER TABLE `spam_topic`
  ADD CONSTRAINT `spam_topic_ibfk_1` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `spam_topic_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `topiclike`
--
ALTER TABLE `topiclike`
  ADD CONSTRAINT `topiclike_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `topiclike_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
