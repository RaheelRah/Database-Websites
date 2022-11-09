-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 07:40 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `client`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(80) NOT NULL,
  `Username` varchar(25) COLLATE utf32_bin NOT NULL,
  `Email` varchar(255) COLLATE utf32_bin NOT NULL,
  `Password` varchar(255) COLLATE utf32_bin NOT NULL,
  `Password2` varchar(255) COLLATE utf32_bin NOT NULL,
  `Password3` varchar(255) COLLATE utf32_bin NOT NULL,
  `KeyCode` varchar(255) COLLATE utf32_bin NOT NULL,
  `SecurityCode` varchar(255) COLLATE utf32_bin NOT NULL DEFAULT '0',
  `Pin` varchar(255) COLLATE utf32_bin NOT NULL,
  `Address` varchar(255) COLLATE utf32_bin NOT NULL,
  `DoB` varchar(10) COLLATE utf32_bin NOT NULL,
  `FirstName` varchar(125) COLLATE utf32_bin NOT NULL,
  `LastName` varchar(125) COLLATE utf32_bin NOT NULL,
  `PayPalBalance` decimal(10,2) NOT NULL,
  `Facebook` varchar(255) COLLATE utf32_bin NOT NULL,
  `Steam` varchar(255) COLLATE utf32_bin NOT NULL,
  `Twitch` varchar(255) COLLATE utf32_bin NOT NULL,
  `Gender` varchar(10) COLLATE utf32_bin NOT NULL,
  `LeagueOfLegends` varchar(255) COLLATE utf32_bin NOT NULL,
  `Complete` int(1) NOT NULL,
  `GCDMemberTier` varchar(16) COLLATE utf32_bin NOT NULL DEFAULT 'x',
  `GCDMembershipNext` varchar(255) COLLATE utf32_bin NOT NULL,
  `GCDAmount` varchar(255) COLLATE utf32_bin NOT NULL,
  `Since` varchar(16) COLLATE utf32_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf32 COLLATE=utf32_bin;

--
-- Dumping data for table `users`
--


--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
