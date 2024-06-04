-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 04, 2024 at 09:39 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `payment_status` varchar(255) DEFAULT 'Unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `full_name`, `address`, `payment_method`, `status`, `payment_status`) VALUES
(1, 2, 'Customer', 'blah blah', 'Cash on Delivery', 'Pending', 'Unpaid'),
(2, 2, 'Md Ashfaqur Rahman', 'Bashentek', 'Credit Card', 'Pending', 'Unpaid');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `name`, `price`, `quantity`, `image`) VALUES
(1, 1, '61', 'GIGABYTE Z790 AORUS MASTER X E-ATX Motherboard', 88750.00, 1, 'https://i.ibb.co/sWmPwYX/Z790-AORUS-MASTER-X-01.png'),
(2, 1, '32', 'GIGABYTE AORUS GeForce RTX 4080 SUPER MASTER 16GB GDDR6X Graphics Card', 216500.00, 1, 'https://i.ibb.co/rHxrPQP/AORUS-Ge-Force-RTX-4080-SUPER-MASTER-16-G-01.png'),
(3, 1, '53', 'GIGABYTE GS32QC 31.5\" 165Hz Curved Gaming Monitor', 49040.00, 1, 'https://i.ibb.co/kgYpxbY/GS32-QC-Gaming-Monitor-01.png'),
(4, 1, '11', 'GIGABYTE Aorus C500 Glass Mid Tower Micro ATX Casing', 15300.00, 1, 'https://i.ibb.co/qCVFDf2/AORUS-C500-GLASS-01.png'),
(5, 2, '62', 'GIGABYTE Z790 AORUS ELITE AX ICE DDR5 ATX MOTHERBOARD', 43900.00, 1, 'https://i.ibb.co/VWc86H8/Z790-AORUS-ELITE-AX-ICE-01.png'),
(6, 2, '34', 'GIGABYTE GeForce RTX 4060 Ti AERO OC 8G GDDR6 Graphics Card', 73100.00, 1, 'https://i.ibb.co/9hYrWN7/Ge-Force-RTX-4060-Ti-AERO-OC-8-G-01.png'),
(7, 2, '53', 'GIGABYTE GS32QC 31.5\" 165Hz Curved Gaming Monitor', 49040.00, 1, 'https://i.ibb.co/kgYpxbY/GS32-QC-Gaming-Monitor-01.png'),
(8, 2, '44', 'GIGABYTE AORUS 15 9MF Core i5 12th Gen RTX 4050 6GB Graphics 15.6\" FHD 360Hz Gaming Laptop', 154550.00, 1, 'https://i.ibb.co/0nMj2VX/aorus-15-9mf.png'),
(9, 2, '21', 'GIGABYTE AORUS WATERFORCE 240 All-in-one Liquid CPU Cooler', 17250.00, 1, 'https://i.ibb.co/wc8TCwy/AORUS-WATERFORCE-240.png');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `code` varchar(50) NOT NULL,
  `brand` varchar(100) NOT NULL,
  `features` text NOT NULL,
  `emi_price` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `product_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `name`, `price`, `status`, `code`, `brand`, `features`, `emi_price`, `image`, `product_category`) VALUES
(4, 'Gigabyte Z890', 54000, 'upcoming', '5712615', 'Gigabyte', 'sdjhkhjksdkhjsafshjkdfhjk', 1270, 'https://i.ibb.co/jGhHWvj/2.jpg', 'Motherboard'),
(5, 'Gigabyte Z990', 65000, 'In Stock', '623553', 'Gigabyte', 'kesjkjesrkhrekhsrkhj', 3000, 'https://i.ibb.co/jGhHWvj/2.jpg', 'Motherboard');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `is_admin`) VALUES
(1, 'admin', '$2a$10$qtNETx3t1Ditcwtuprne1.VxEqvCT5TOzX/nAIBNZU76dy6AoIevG', 1),
(2, 'customer', '$2a$10$I1dSZo1GUvsyABcfiGp/EedTkH5kaXl8vPWYtrKU6hCey.THJkQq.', 0),
(5, 'naveel', '$2a$10$Ngh7npPZStuA.15LUlqLi.FEfoUs60iCAQqEPKasdfC0aKUd3qCDK', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
