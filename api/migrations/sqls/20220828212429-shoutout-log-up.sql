CREATE TABLE `shoutout_log`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `usernameFrom` VARCHAR(25) NOT NULL,
  `usernameTo` VARCHAR(25) NOT NULL,
  `dateShouted` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`usernameFrom`) REFERENCES `user`(`username`),
  FOREIGN KEY (`usernameTo`) REFERENCES `user`(`username`)
) ENGINE=InnoDB;
