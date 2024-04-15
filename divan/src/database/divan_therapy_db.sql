-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-03-2023 a las 18:07:00
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `divan_therapy_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `therapists`
--

CREATE TABLE `therapists` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `birthdate` date DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `speciality` varchar(255) DEFAULT NULL,
  `type_therapist` varchar(255) DEFAULT NULL,
  `total_sessions` int(11) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `medical_registration` varchar(255) DEFAULT NULL,
  `id_country` int(10) UNSIGNED DEFAULT NULL,
  `id_province` int(10) UNSIGNED DEFAULT NULL,
  `id_city` int(10) UNSIGNED DEFAULT NULL,
  `id_zone` int(10) UNSIGNED DEFAULT NULL,
  `id_name_est` int(10) UNSIGNED DEFAULT NULL,
  `id_name_gender` int(10) UNSIGNED DEFAULT NULL,
  `id_price` int(10) UNSIGNED DEFAULT NULL,
  `id_session_hours` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `therapists`
--

INSERT INTO `therapists` (`id`, `name`, `lastname`,`email`, `birthdate`,`avatar`, `speciality`, `type_therapist`, `total_sessions`, `phone`, `medical_registration`, `id_country`,`id_province`,`id_city`,`id_zone`, `id_name_est`, `id_name_gender`,`id_price`,`id_session_hours`) VALUES
(1, 'Miles', 'Davis', 'milesdavis@email.com', '1926-05-26','therapist-card.jpg', 'Psicoanálisis','Cognitivo', 1,'1111111111111','2222222',1,1,1,2,1,1,1,1),
(2, 'Whitney', 'Houston', 'whitneyhouston@divantherapy.com', '1963-08-09','therapist-card.jpg', 'Psicoanálisis', 'Cognitivo', 2,'2222222222222','33333333',1,1,2,5,2,2,1,1),
(3, 'Gloria', 'Estefan', 'gloriaestefan@email.com', '1957-07-01','therapist-card.jpg', 'Psicoanálisis','Cognitivo', 3,'3333333333333','44444444',2,4,9,16,1,2,1,1),
(4, 'Santos', 'Cambalache dicépolo', 'santos@email.com', '1901-03-27','therapist-card.jpg', 'Psicoanálisis','Cognitivo', 1,'1111111111111','2222222',1,1,2,4,1,1,1,1),
(5, 'Roger', 'Nelson', 'prince@email.com', '1958-06-07','therapist-card.jpg', 'Psicoanálisis','Cognitivo', 5, '4444444444444','55555555',2,4,9,17,4,1,1,1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prices`
--

CREATE TABLE `prices` (
  `id` int(10) UNSIGNED NOT NULL,
  `price` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `prices`
--

INSERT INTO `prices` (`id`, `price`) VALUES
(1, 3500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `session_hours`
--

CREATE TABLE `session_hours` (
  `id` int(10) UNSIGNED NOT NULL,
  `session_hours` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `session_hours`
--

INSERT INTO `session_hours` (`id`, `session_hours`) VALUES
(1, '40');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacts`
--

CREATE TABLE `contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medical-appointments`
--

CREATE TABLE `medical_appointments` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `modality` varchar(255) DEFAULT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `id_therapist` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `therapists_users`
--

CREATE TABLE `therapists_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_therapist` int(10) UNSIGNED DEFAULT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_contacts`
--

CREATE TABLE `users_contacts` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `id_contact` int(10) UNSIGNED DEFAULT NULL,
  `quantity_contacts` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_donations`
--

CREATE TABLE `users_donations` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL,
  `id_donation` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Estructura de tabla para la tabla `moods_users`
--

CREATE TABLE `moods_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_mood` int(10) UNSIGNED DEFAULT NULL,
  `id_user` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `id_user_category` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_categories`
--

CREATE TABLE `users_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `type` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users_categories`
--

INSERT INTO `users_categories` (`id`, `type`) VALUES
(1, 'Admin'),
(2, 'Client');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `establishments`
--

CREATE TABLE `establishments` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_establishment` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `establishments`
--

INSERT INTO `establishments` (`id`, `name_establishment`) VALUES
(1, 'htal. Garraham'),
(2, 'htal. San martín'),
(3, 'htal. San juan de Dios'),
(4, 'Mater Dei');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `donations`
--

CREATE TABLE `donations` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `donation` int(10) DEFAULT NULL,
  `donor_email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messages`
--

CREATE TABLE `messages` (
  `id` int(10) UNSIGNED NOT NULL,
  `city_message` varchar(255) DEFAULT NULL,
  `province_message` varchar(255) DEFAULT NULL,
  `country_message` varchar(255) DEFAULT NULL,
  `date_message` date DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `id_user_message` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `genders`
--

CREATE TABLE `genders` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_gender` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `genders`
--

INSERT INTO `genders` (`id`, `name_gender`) VALUES
(1, 'Femenino'),
(2, 'Masculino');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `countries`
--

CREATE TABLE `countries` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_country` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `countries`
--

INSERT INTO `countries` (`id`, `name_country`) VALUES
(1, "Argentina"),
(2, "Uruguay"),
(3, "Brasil"),
(4, "Colombia"),
(5, "Chile"),
(6, "Puerto Rico"),
(7, "Salvador");

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `provinces`
--

CREATE TABLE `provinces` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_province` varchar(255) DEFAULT NULL,
  `id_name_country` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `provinces`
--

INSERT INTO `provinces` (`id`, `name_province`, `id_name_country`) VALUES
(1, 'Buenos Aires Province', 1),
(2, 'Cordoba', 1),
(3, 'Mendoza', 1),
(4, 'Montevideo', 2),
(5, 'San Pablo', 3),
(6, 'Rio de janeiro', 3),
(7, 'Bogota', 4),
(8, 'Santiago de chile', 5),
(9, 'San juan', 6),
(10, 'San salvador', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cities`
--

CREATE TABLE `cities` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_city` varchar(255) DEFAULT NULL,
  `id_name_province` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `cities`
--

INSERT INTO `cities` (`id`, `name_city`, `id_name_province`) VALUES
(1, "La Plata", 1),
(2, "Ciduad autónoma", 1),
(3, "San pedro", 1),
(4, "Cordoba", 2),
(5, "Jesus María", 2),
(6, "Luján de cuyo", 3),
(7, "Maipú", 3),
(8, "Malargüe", 3),
(9, "Montevideo", 4),
(10, "San Pablo", 5),
(11, "Santo André", 5),
(12, "Ipanema", 6),
(13, "Copacabana", 6),
(14, "Santa Fé", 7),
(15, "San Cristobal", 7),
(16, "Buin", 8),
(17, "Batuco", 8),
(18, "Rivadavia", 9),
(19, "Santa Lucía", 9),
(20, "El pisnal", 10),
(21, "Ciudad Delgado", 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `zones`
--

CREATE TABLE `zones` (
  `id` int(10) UNSIGNED NOT NULL,
  `name_zone` varchar(255) DEFAULT NULL,
  `id_name_city` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `zone`
--

INSERT INTO `zones` (`id`, `name_zone`, `id_name_city`) VALUES
(1, 'La Plata', 1),
(2, 'City bell', 1),
(3, 'Gonnet', 1),
(4, 'Caballito', 2),
(5, 'Microcentro', 2),
(6, 'Don Juan', 3),
(7, 'Bajo Puerto', 3),
(8, 'Zona Norte', 4),
(9, 'Zona sur', 4),
(10, 'Jesus María', 5),
(11, 'Valle encantado', 6),
(12, 'Buenos vecinos', 6),
(13, 'Barrio Viejo', 7),
(14, 'Las torcacitas', 7),
(15, 'Rio Grande', 8),
(16, 'Agua escondida', 8),
(17, 'La Mondiola', 9),
(18, 'Parque Batlle', 9),
(19, 'Sé', 10),
(20, 'Bella Vista', 10),
(21, 'República', 10),
(22, 'Centro', 11),
(23, 'Villa bastos', 11),
(24, 'Casa Branca', 11),
(25, 'Praia de Ipanema', 12),
(26, 'General Osorio', 12),
(27, 'Praca Manuel C. Paz', 13),
(28, 'Peixoto', 13),
(29, 'Joao Batista', 13),
(30, 'Cartagena', 14),
(31, 'El Rocío', 14),
(32, 'La Peña', 14),
(33, 'Granada Sur', 15),
(34, 'Quiroga', 15),
(35, 'Marruecos', 15),
(36, 'Paine', 16),
(37, 'San Bernardo', 16),
(38, 'Lampa', 17),
(39, 'Quilicura', 17),
(40, 'Casas', 18),
(41, 'Obrero', 18),
(42, 'Villa Rio S. Juan', 19),
(43, 'Colmado Domitila', 19),
(44, 'El Bejuco', 20),
(45, 'Las Victorias', 21),
(46, 'San Jose', 21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moods`
--

CREATE TABLE `moods` (
  `id` int(10) UNSIGNED NOT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `mood` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `therapists`
--
ALTER TABLE `therapists`
  ADD PRIMARY KEY (`id`),
   ADD KEY `fk_country` (`id_country`),
   ADD KEY `fk_province` (`id_province`),
   ADD KEY `fk_city` (`id_city`),
   ADD KEY `fk_zone` (`id_zone`),
   ADD KEY `fk_name_est` (`id_name_est`),
   ADD KEY `fk_name_gender` (`id_name_gender`),
   ADD KEY `fk_price` (`id_price`),
   ADD KEY `fk_session_hours` (`id_session_hours`);

--
-- Indices de la tabla `prices`
--
ALTER TABLE `prices`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `session_hours`
--
ALTER TABLE `session_hours`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `medical_appointments`
--
ALTER TABLE `medical_appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_appointments` (`id_user`),
  ADD KEY `fk_therapist_appointments` (`id_therapist`);

--
-- Indices de la tabla `therapists_users`
--
ALTER TABLE `therapists_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_therapist` (`id_therapist`),
  ADD KEY `fk_user` (`id_user`);

--
-- Indices de la tabla `users_contacts`
--
ALTER TABLE `users_contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_users_contacts` (`id_user`),
  ADD KEY `fk_contact` (`id_contact`);

  --
-- Indices de la tabla `users_donations`
--
ALTER TABLE `users_donations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_donation` (`id_user`),
  ADD KEY `fk_donation` (`id_donation`);

--
-- Indices de la tabla `moods_users`
--
ALTER TABLE `moods_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_mood` (`id_mood`),
  ADD KEY `fk_users_moods` (`id_user`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_category` (`id_user_category`);


--
-- Indices de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `establishments`
--
ALTER TABLE `establishments`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`id`);
  
--
-- Indices de la tabla `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user_message` (`id_user_message`);

--
-- Indices de la tabla `genders`
--
ALTER TABLE `genders`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_name_country` (`id_name_country`);

--
-- Indices de la tabla `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_name_province` (`id_name_province`);

--
-- Indices de la tabla `zones`
--
ALTER TABLE `zones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_name_city` (`id_name_city`);

--
-- Indices de la tabla `moods`
--
ALTER TABLE `moods`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `therapists`
--
ALTER TABLE `therapists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `prices`
--
ALTER TABLE `prices`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `session_hours`
--
ALTER TABLE `session_hours`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `conatcts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `medical_appointments`
--
ALTER TABLE `medical_appointments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tehrapists_users`
--
ALTER TABLE `therapists_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_contacts`
--
ALTER TABLE `users_contacts`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_donations`
--
ALTER TABLE `users_donations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `moods_users`
--
ALTER TABLE `moods_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `users_categories`
--
ALTER TABLE `users_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `establishments`
--
ALTER TABLE `establishments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `donations`
--
ALTER TABLE `donations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `genders`
--
ALTER TABLE `genders`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `contries`
--
ALTER TABLE `countries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `zones`
--
ALTER TABLE `zones`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `moods`
--
ALTER TABLE `moods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `therapists`
--
ALTER TABLE `therapists`
  ADD CONSTRAINT `fk_country` FOREIGN KEY (`id_country`) REFERENCES `countries` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_province` FOREIGN KEY (`id_province`) REFERENCES `provinces` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_city` FOREIGN KEY (`id_city`) REFERENCES `cities` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_zone` FOREIGN KEY (`id_zone`) REFERENCES `zones` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_name_est` FOREIGN KEY (`id_name_est`) REFERENCES `establishments` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_name_gender` FOREIGN KEY (`id_name_gender`) REFERENCES `genders` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_price` FOREIGN KEY (`id_price`) REFERENCES `prices` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_session_hours` FOREIGN KEY (`id_session_hours`) REFERENCES `session_hours` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `medical_appointments`
--
ALTER TABLE `medical_appointments`
  ADD CONSTRAINT `fk_appointments_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_appointments_therapist` FOREIGN KEY (`id_therapist`) REFERENCES `therapists` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `therapists_users`
--
ALTER TABLE `therapists_users`
  ADD CONSTRAINT `fk_therapist` FOREIGN KEY (`id_therapist`) REFERENCES `therapists` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users_contacts`
--
ALTER TABLE `users_contacts`
  ADD CONSTRAINT `fk_users_contacts` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_contact` FOREIGN KEY (`id_contact`) REFERENCES `contacts` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users_donations`
--
ALTER TABLE `users_donations`
  ADD CONSTRAINT `fk_users_donation` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_donation` FOREIGN KEY (`id_donation`) REFERENCES `donations` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `moods_users`
--
ALTER TABLE `moods_users`
  ADD CONSTRAINT `fk_mood` FOREIGN KEY (`id_mood`) REFERENCES `moods` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_users_moods` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_user_category` FOREIGN KEY (`id_user_category`) REFERENCES `users_categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `fk_user_message` FOREIGN KEY (`id_user_message`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `provinces`
--
ALTER TABLE `provinces`
  ADD CONSTRAINT `fk_country_provinces` FOREIGN KEY (`id_name_country`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `cities`
--
ALTER TABLE `cities`
  ADD CONSTRAINT `fk_city_province` FOREIGN KEY (`id_name_province`) REFERENCES `provinces` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `zones`
--
ALTER TABLE `zones`
  ADD CONSTRAINT `fk_zone_city` FOREIGN KEY (`id_name_city`) REFERENCES `cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;