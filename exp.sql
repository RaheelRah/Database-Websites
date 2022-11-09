-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 09, 2022 at 07:42 AM
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
-- Database: `exp`
--

-- --------------------------------------------------------

--
-- Table structure for table `datastrings`
--

CREATE TABLE `datastrings` (
  `ID` int(80) NOT NULL,
  `X` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Z` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `datastrings`
--

INSERT INTO `datastrings` (`ID`, `X`, `Z`) VALUES
(1, 'groups', 'x: \"Groups\", y: \"Users\", z: \"Following\", z2: \"true\", y2: \"Rah1337\", x2: \"Root\"'),
(2, 'users', 'x: \"Users\", y: \"Users\", z: \"Users\", z2: \"true\", y2: \"Rah1337\", x2: \"Rah1337\"'),
(3, 'apps', 'x: \"Application\", y: \"Application\", z: \"Application\", z2: \"true\", y2: \"Links\", x2: \"Links\"'),
(4, 'apps', 'x: \"Application\", y: \"Application\", z: \"Application\", z2: \"true\", y2: \"Users\", x2: \"Users\"'),
(5, 'apps', 'x: \"Application\", y: \"Application\", z: \"Application\", z2: \"true\", y2: \"Groups\", x2: \"Groups\"');

-- --------------------------------------------------------

--
-- Table structure for table `html`
--

CREATE TABLE `html` (
  `ID` int(80) NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `HTML` text COLLATE utf8mb4_bin NOT NULL,
  `DataString` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `html`
--

INSERT INTO `html` (`ID`, `Name`, `HTML`, `DataString`) VALUES
(1, 'intro-splash', '<div class=\"p-1 text-light\">\n <h1 class=\"h1 display-4\">Welcome to our website</h1>\n <p class=\"lead\">\n  We wish you a happy time when using your website;<br/>\n  <small>\n   As you can see Experimental JS is a website that hosts an experimental client and server sided JS framework.\n  </small>\n </p>\nBelow is an example of data rendered and extrappolated from the database...\n</div>\n	<summary class=\"text-light p-2\">\n		<details>\n			Framework:<br/>\n			Welcome to our framework!<br/>\n			To build on our application is simple!<br/>\n			<br/>\n			This website has 3 main parts to it.<br/>\n			A) The Page<br/>\n			B) The HTML<br/>\n			C) The DATA<br/>\n			<br/>\n			Everything is stored in the database and called from the database.<br/>\n			For \"The Page\" you must sake the:<br/>\n			Domain: \"iprototype.com.au:7777\"<br/>\n			URL: \"\"<br/>\n			HTML: \"<i>Anything you want at the top of the page...</i>\"<br/>\n			JS: \n			<kbd><pre class=\"text-light\">\n				app = {\n				 boilerplate: \"Experimental JS\",\n				 desc: \"Experimental JS is a framework designed to handle any query/paradigm in graph formatting.\",\n				 links: {\n				  \"/users\": \"users\",\n				  \"/groups\": \"groups\",\n				  \"/games\": \"games\"\n				 },\n				 modules: [\"intro-splash\", \"games-splash\", \"groups-splash\", \"users-splash\"]\n				};\n			</pre></kbd>\n			<br/>\n			For \"The HTML\" you must sake the:<br/>\n			Name: \"intro-splash\"<br/>\n			HTML: \'&lt;div class=\"row\"&gt;...\'<br/>\n			DataString: [\"intro\"]<br/>\n			<br/>\n			For \"The DATA\" you must sake the:<br/>\n			\'data-repeat\' attribute with the data_string label.<br/>\n		</details>\n	</summary>', '[\'intro\']'),
(2, 'groups-splash', '<div class=\"col-6 float-left p-1 text-light\">\n <h3 class=\"h3\">Check out our new Groups!</h3>\n <p class=\"lead\">\n  Our groups are made by independant leaders.<br/>\n  <small>\n   These are our newest groups:\n  </small>\n </p>\n <ul class=\"list-group\">\n  <li class=\"list-group-item bg-darker\" data-repeat=\"groups\">\n   {{x2}}\n  </li>\n </ul>\n</div>', '[\'groups\']'),
(3, 'users-splash', '<div class=\"col-6 float-left p-1 text-light\">\n <h3 class=\"h3\">Check out our new Users!</h3>\n <p class=\"lead\">\n  Our users who have registered on our platform just recently.<br/>\n  <small>\n   These are our newest users:\n  </small>\n </p>\n <ul class=\"list-group\">\n  <li class=\"list-group-item bg-darker\" data-repeat=\"users\">\n   {{x2}}\n  </li>\n </ul>\n</div>', '[\'users\']'),
(4, 'users', '<div class=\"col-12 p-1 text-light\">\n<ul class=\"list-group\">\n<li class=\"list-group-item bg-darker text-center\" data-repeat=\"users\">\n<a onclick=\"window.location = \'http://gatesofkerash.com.au/client/users/{{x2}}\'\">{{x2}}</a><br/>\n<img src=\"/images/avatars/{{x2}}.png\" width=\"100px\"/><br/>				\n</li>\n</ul>\n	</div>', '[\'users\']'),
(5, 'groups', '<div class=\"col-12 p-1 text-light\">\n<ul class=\"list-group\">\n<li class=\"list-group-item bg-darker text-center\" data-repeat=\"groups\">\n<a onclick=\"window.location = \'http://gatesofkerash.com.au/client/groups/{{x2}}\'\">{{x2}}</a><br/>\n<img src=\"/images/groups/{{x2}}.png\" width=\"100px\"/><br/>				\n</li>\n</ul>\n	</div>', '[\'groups\']'),
(6, 'users-splash', '<div class=\"col-6 float-left p-1 text-light\">\r\n <h3 class=\"h3\">Check out our new Users!</h3>\r\n <p class=\"lead\">\r\n  Our users who have registered on our platform just recently.<br/>\r\n  <small>\r\n   These are our newest users:\r\n  </small>\r\n </p>\r\n <ul class=\"list-group\">\r\n  <li class=\"list-group-item bg-darker\" data-repeat=\"users\">\r\n   {{x2}}\r\n  </li>\r\n </ul>\r\n</div>', '[\'users\']'),
(8, 'applications', '<div class=\"col-6 float-left p-1 text-light\">\r\n <h3 class=\"h3\">Check out our new Users!</h3>\r\n <p class=\"lead\">\r\n  Our users who have registered on our platform just recently.<br/>\r\n  <small>\r\n   These are our newest users:\r\n  </small>\r\n </p>\r\n <ul class=\"list-group\">\r\n  <li class=\"list-group-item bg-darker\" data-repeat=\"apps\">\r\n   {{x2}}\r\n  </li>\r\n </ul>\r\n</div>', '[\'apps\']');

-- --------------------------------------------------------

--
-- Table structure for table `paradigm`
--

CREATE TABLE `paradigm` (
  `ID` int(80) NOT NULL,
  `Domain` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Url` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `HTML` text COLLATE utf8mb4_bin NOT NULL,
  `JS` text COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

--
-- Dumping data for table `paradigm`
--

INSERT INTO `paradigm` (`ID`, `Domain`, `Url`, `HTML`, `JS`) VALUES
(1, 'localhost:1234', '', '<span class=\"text-light\">Famework Concept Created By Rah1337</span>', 'app = {\n boilerplate: \"Experimental JS\",\ndesc: \"Experimental JS is a framework designed to handle any query/paradigm in graph formatting.\",\n links: {\n  \"/users\": \"users\",\n  \"/groups\": \"groups\",\n  \"/links\": \"links\"\n },\n modules: [\"intro-splash\", \"groups-splash\", \"users-splash\"]\n};'),
(2, 'localhost:1234', 'users', '<span class=\"text-light\">Famework Concept Created By Rah1337</span>', 'app = {\n boilerplate: \"Experimental JS\",\ndesc: \"Experimental JS is a framework designed to handle any query/paradigm in graph formatting.\",\n links: {\n  \"/\": \"home\",\n  \"/groups\": \"groups\",\n  \"/links\": \"links\"\n },\n modules: [\"users\"]\n};'),
(3, 'localhost:1234', 'groups', '<span class=\"text-light\">Famework Concept Created By Rah1337</span>', 'app = {\n boilerplate: \"Experimental JS\",\ndesc: \"Experimental JS is a framework designed to handle any query/paradigm in graph formatting.\",\n links: {\n  \"/\": \"home\",\n  \"/users\": \"users\",\n  \"/links\": \"links\"\n },\n modules: [\"groups\"]\n};'),
(4, 'localhost:1234', 'links', '<span class=\"text-light\">Welcome to Experimental JS</span>', 'app = {\r\n boilerplate: \"Find Applications\",\r\ndesc: \"Here you can find a list off applications that have been installed onto this website\",\r\n links: {\r\n  \"/users\": \"users\",\r\n  \"/groups\": \"groups\",\r\n  \"/links\": \"links\"\r\n },\r\n modules: [\"applications\"]\r\n};');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `datastrings`
--
ALTER TABLE `datastrings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `html`
--
ALTER TABLE `html`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `paradigm`
--
ALTER TABLE `paradigm`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `datastrings`
--
ALTER TABLE `datastrings`
  MODIFY `ID` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `html`
--
ALTER TABLE `html`
  MODIFY `ID` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `paradigm`
--
ALTER TABLE `paradigm`
  MODIFY `ID` int(80) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
