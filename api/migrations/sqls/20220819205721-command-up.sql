CREATE TABLE `command`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `command` VARCHAR(500) NULL,
  `description` VARCHAR(255) NOT NULL,
  UNIQUE INDEX(`name`)
) ENGINE = InnoDB;

CREATE TABLE `command_keyword`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `keyword` VARCHAR(32) NOT NULL,
  `commandID` INT UNSIGNED NOT NULL,
  `isPrimary` TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE INDEX(`keyword`),
  FOREIGN KEY (`commandID`) REFERENCES `command`(`id`),
  INDEX(`isPrimary`)
) ENGINE = InnoDB;

CREATE TABLE `command_log`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `commandID` INT UNSIGNED NOT NULL,
  `datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`commandID`) REFERENCES `command`(`id`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`id`)
) ENGINE = InnoDB;
