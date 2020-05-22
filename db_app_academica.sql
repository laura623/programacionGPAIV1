-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2020 at 10:28 PM
-- Server version: 10.1.33-MariaDB
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_app_academica`
--

-- --------------------------------------------------------

--
-- Table structure for table `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int(10) NOT NULL,
  `codigo` char(15) NOT NULL,
  `nombre` char(65) NOT NULL,
  `direccion` text NOT NULL,
  `telefono` char(9) NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `codigo`, `nombre`, `direccion`, `telefono`, `activo`) VALUES
(1, 'USLC018804', 'Luis Enrique Hernandez', 'Usulutan', '3333-5666', 0),
(18, 'USIS123456', 'Rosa Yasmin', 'San Miguel', '2616-2020', 0);

-- --------------------------------------------------------

--
-- Table structure for table `docentes`
--

CREATE TABLE `docentes` (
  `idDocente` int(10) NOT NULL,
  `codigo` char(10) NOT NULL,
  `nombre` char(65) NOT NULL,
  `direccion` char(100) NOT NULL,
  `telefono` char(10) NOT NULL,
  `dui` char(10) NOT NULL,
  `nit` char(17) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `docentes`
--

INSERT INTO `docentes` (`idDocente`, `codigo`, `nombre`, `direccion`, `telefono`, `dui`, `nit`) VALUES
(1, '682', 'Luis Enrique Hernandez Sanchez', 'Usulutan', '2323-4545', '12345678-9', '1111-222222-222-2'),
(3, '683', 'Octavio', 'Gomez', '2345-1223', '12345564-2', '1212-121212-122-3');

-- --------------------------------------------------------

--
-- Table structure for table `materias`
--

CREATE TABLE `materias` (
  `idMateria` int(10) NOT NULL,
  `codigo` char(10) NOT NULL,
  `nombre` char(45) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `materias`
--

INSERT INTO `materias` (`idMateria`, `codigo`, `nombre`) VALUES
(1, '473', 'Progra I'),
(2, '471', 'Progra IV'),
(3, '472', 'Progra III'),
(5, '474', 'Progra II');

-- --------------------------------------------------------

--
-- Table structure for table `matriculas`
--

CREATE TABLE `matriculas` (
  `idMatricula` int(10) NOT NULL,
  `idPeriodo` int(10) NOT NULL,
  `idAlumno` int(10) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `matriculas`
--

INSERT INTO `matriculas` (`idMatricula`, `idPeriodo`, `idAlumno`, `fecha`) VALUES
(1, 3, 1, '2020-04-13'),
(2, 3, 12, '2020-04-13'),
(3, 4, 1, '2020-04-13'),
(4, 4, 1, '2020-04-20');

-- --------------------------------------------------------

--
-- Table structure for table `periodos`
--

CREATE TABLE `periodos` (
  `idPeriodo` int(10) NOT NULL,
  `periodo` char(35) NOT NULL,
  `activo` char(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `periodos`
--

INSERT INTO `periodos` (`idPeriodo`, `periodo`, `activo`) VALUES
(1, 'Ciclo I - 2019', 'no'),
(2, 'Ciclo II - 2019', 'no'),
(3, 'Ciclo I - 2020', 'si'),
(4, 'Ciclo II - 2020', 'no');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`);

--
-- Indexes for table `docentes`
--
ALTER TABLE `docentes`
  ADD PRIMARY KEY (`idDocente`);

--
-- Indexes for table `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`);

--
-- Indexes for table `matriculas`
--
ALTER TABLE `matriculas`
  ADD PRIMARY KEY (`idMatricula`),
  ADD KEY `idAlumno` (`idAlumno`),
  ADD KEY `idPeriodo` (`idPeriodo`);

--
-- Indexes for table `periodos`
--
ALTER TABLE `periodos`
  ADD PRIMARY KEY (`idPeriodo`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `docentes`
--
ALTER TABLE `docentes`
  MODIFY `idDocente` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `materias`
--
ALTER TABLE `materias`
  MODIFY `idMateria` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `matriculas`
--
ALTER TABLE `matriculas`
  MODIFY `idMatricula` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `periodos`
--
ALTER TABLE `periodos`
  MODIFY `idPeriodo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
