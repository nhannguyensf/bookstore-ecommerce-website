-- MySQL dump 10.13  Distrib 8.2.0, for macos13.5 (arm64)
--
-- Host: localhost    Database: ecommerceBookstore
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `imgName` varchar(255) DEFAULT NULL,
  `description` text,
  `creator` varchar(255) DEFAULT NULL,
  `keywords` text,
  `isFeatured` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`,`type`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES (1,'narnia','paperback',14.99,'narnia','The Lion, the Witch, and the Wardrobe is the first book in the Chronicles of Narnia series by C.S. Lewis. Follow the adventures of four children as they stumble upon a mysterious wardrobe that leads them into the enchanting world of Narnia. There, they join forces with talking animals and mythical creatures, embarking on a thrilling quest to defeat the evil White Witch and restore peace to the land.','C.S. Lewis','Fantasy, Adventure, Children\'s literature, Chronicles of Narnia, Talking animals, Aslan, Wardrobe, Magic, Christian allegory, Siblings, Lion, Witch, and the Wardrobe, Prince Caspian, The Voyage of the Dawn Treader, The Silver Chair, The Horse and His Boy, The Magician\'s Nephew, The Last Battle',1),(2,'narnia','ebook',4.99,'narnia','Follow the adventures of four children as they stumble upon a mysterious wardrobe that leads them into the enchanting world of Narnia.','C.S. Lewis','Fantasy, Adventure, Children\'s literature, Chronicles of Narnia, Talking animals, Aslan, Wardrobe, Magic, Christian allegory, Siblings, Lion, Witch, and the Wardrobe, Prince Caspian, The Voyage of the Dawn Treader, The Silver Chair, The Horse and His Boy, The Magician\'s Nephew, The Last Battle',1),(3,'hungerGames','paperback',10.99,'hungerGames','The first installment of Suzanne Collins gripping trilogy, readers are transported to a dystopian future where a cruel government forces children from each district to participate in a brutal fight to the death.','Suzanne Collins','Young Adult, Dystopian, Action, Adventure, Survival, Rebellion, Katniss Everdeen, Peeta Mellark, Districts, Panem, Mockingjay, Trilogy, Games, War, Love Triangle, Political, Social Commentary, Sacrifice, Courage',1),(4,'hungerGames','audiobook',14.99,'hungerGames','The first installment of Suzanne Collins gripping trilogy, readers are transported to a dystopian future where a cruel government forces children from each district to participate in a brutal fight to the death.','Suzanne Collins','Young Adult, Dystopian, Action, Adventure, Survival, Rebellion, Katniss Everdeen, Peeta Mellark, Districts, Panem, Mockingjay, Trilogy, Games, War, Love Triangle, Political, Social Commentary, Sacrifice, Courage',1),(5,'harryPotter','paperback',9.99,'harryPotter','Follow the remarkable journey of Harry Potter, an orphaned boy who discovers on his eleventh birthday that he is a wizard.','J.K. Rowling','Wizarding World, Hogwarts, Magic, Spells, Witches, Wizards, School of Witchcraft and Wizardry, Gryffindor, Slytherin, Hufflepuff, Ravenclaw, Muggles, Voldemort, Deathly Hallows, Philosopher\'s Stone, Chamber of Secrets, Prisoner of Azkaban, Goblet of Fire, Order of the Phoenix, Half-Blood Prince, Deathly Hallows',1),(6,'harryPotter','audiobook',29.99,'harryPotter','Follow the remarkable journey of Harry Potter, an orphaned boy who discovers on his eleventh birthday that he is a wizard.','J.K. Rowling','Wizarding World, Hogwarts, Magic, Spells, Witches, Wizards, School of Witchcraft and Wizardry, Gryffindor, Slytherin, Hufflepuff, Ravenclaw, Muggles, Voldemort, Deathly Hallows, Philosopher\'s Stone, Chamber of Secrets, Prisoner of Azkaban, Goblet of Fire, Order of the Phoenix, Half-Blood Prince, Deathly Hallows',1),(7,'gameOfThrones','audiobook',34.99,'gameOfThrones','Set in the fictional continents of Westeros and Essos, this story delves into the intricate web of political intrigue, power struggles, and complex family dynamics as noble houses vie for control of the Iron Throne.','George R.R. Martin','A Song of Ice and Fire, Westeros, Seven Kingdoms, House Stark, House Lannister, House Targaryen, Winter is Coming, Iron Throne, Daenerys Targaryen, Jon Snow, Tyrion Lannister, Arya Stark, Fantasy, Dragons, Politics, Intrigue, War, Betrayal, Medieval, Epic, Television Series, Books, Night\'s Watch, White Walkers, Valar Morghulis',0),(8,'gameOfThrones','ebook',9.99,'gameOfThrones','Set in the fictional continents of Westeros and Essos, this story delves into the intricate web of political intrigue, power struggles, and complex family dynamics as noble houses vie for control of the Iron Throne.','George R.R. Martin','A Song of Ice and Fire, Westeros, Seven Kingdoms, House Stark, House Lannister, House Targaryen, Winter is Coming, Iron Throne, Daenerys Targaryen, Jon Snow, Tyrion Lannister, Arya Stark, Fantasy, Dragons, Politics, Intrigue, War, Betrayal, Medieval, Epic, Television Series, Books, Night\'s Watch, White Walkers, Valar Morghulis',0),(9,'thinkFastSlow','ebook',12.99,'thinkFastSlow','Through a combination of cognitive psychology, behavioral economics, and real-world examples, Kahneman delves into the biases and heuristics that influence our reasoning and judgment.','Daniel Kahneman','Cognitive Bias, Decision-Making, Dual Process Theory, Behavioral Economics, Psychology, Heuristics, Biases, System 1, System 2, Intuition, Rationality, Judgment, Reasoning, Prospect Theory, Anchoring, Availability Heuristic, Overconfidence, Loss Aversion, Priming, Framing, Nobel Prize, Human Mind',0),(10,'bookmark','accessory',4.99,'bookmark','A small, handy accessory used to mark the page in a book where you left off.','BookCrafters','Reading, Page marker, Literary accessory, Paper, Tassel, Ribbon, Design, Personalized, Bookmarking, Book lover, Novel, Literary, Gift, Practical, Portable, Thin, Flat, Rectangular',0),(11,'highlighters','accessory',9.99,'highligters','A set of highlighters is a collection of vibrant and colorful markers designed specifically for highlighting and underlining important information in text.','BookCrafters','Marker, Fluorescent, Bright, Colorful, Study aid, Note-taking',0),(12,'notebook','accessory',12.99,'notebook','A sleek and versatile accessory for jotting down thoughts, ideas, and notes.','BookCrafters','Journal, Writing, Paper, Pages, Binding, Cover, Portable, Stationery, Notepad, Record, Diary',0),(13,'readingLight','accessory',19.99,'readingLight','Compact and portable device specifically designed to provide focused illumination for reading purposes.','BookCrafters','Portable, Adjustable, Illumination, LED, Clip-on, Compact, Battery-powered, Flexible, Hands-free, Brightness control, Eye-friendly, Lightweight, Nighttime reading, Portable lighting',0),(14,'algorithmDesign','audiobook',20.99,'algorithmDesign','This book serves as a valuable resource for computer science students, engineers, and professionals seeking a deeper understanding of algorithmic problem-solving.','Steven S. Skiena','Algorithm Design Manual, Algorithms, Data Structures, Problem Solving, Programming, Computational Thinking, Algorithmic Techniques, Analysis of Algorithms, Graph Algorithms, Greedy Algorithms, Dynamic Programming, Divide and Conquer, Sorting, Searching, String Algorithms, NP-Completeness, Computational Complexity',0),(15,'commonSenseInvesting','ebook',9.99,'gameOfThrones','\"Common Sense Investing\" offers practical and timeless advice to help individuals make informed decisions and build wealth through sound investment strategies.','John C. Bogle','Common Sense Investing, Index Funds, Passive Investing, Mutual Funds, Financial Markets, Investment Strategy, Portfolio Management, Diversification, Long-Term Investing, Low-Cost Investing, Risk Management, Asset Allocation, Market Efficiency, Retirement Planning, Personal Finance, Bogleheads, Value Investing, Stock Market, Investor Education',0),(16,'jackRyan','paperBack',10.99,'jackRyan','Engaging thriller novel featuring Jack Ryan.','Tom Clancy','thriller, spy, action',0),(17,'1984','eBook',8.99,'1984','Dystopian novel exploring totalitarianism and surveillance society.','George Orwell','dystopia, politics, society',0),(18,'noExit','audioBook',14.99,'noExit','A gripping psychological thriller set at a remote lodge.','Jean-Paul Sartre','psychological thriller, suspense, lodge',0);
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-10  9:21:00
