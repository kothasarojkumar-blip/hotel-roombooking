-- Run this ONCE as the MySQL root user to prepare the database.
-- Windows (Command Prompt or PowerShell):
--   mysql -u root -p < database/create-database.sql
--
-- IMPORTANT: change the password below before running. Do not commit your real password.

CREATE DATABASE IF NOT EXISTS hotel_booking
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- A dedicated user is safer than using root from the application.
CREATE USER IF NOT EXISTS 'hotel_user'@'localhost' IDENTIFIED BY 'ChangeMe_Local_Only_123!';
GRANT ALL PRIVILEGES ON hotel_booking.* TO 'hotel_user'@'localhost';
FLUSH PRIVILEGES;
