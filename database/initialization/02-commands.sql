-- #############################################################################
-- Stores the list of commands
-- #############################################################################
CREATE TABLE `command`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `command` VARCHAR(255) NULL,
  UNIQUE INDEX(`name`)
) ENGINE = InnoDB;

-- Insert the initial list of commands
INSERT INTO `command`(`name`, `command`)
VALUES
  ('!bot', 'Hey. I am @twentytwobot, built by @22atreyu22 for his channel. type !commands or !help to see what I can do.'),
  ('!hello', '{1}, hiya!'),
  ('!shoutout', null),
  ('!so', null);

-- #############################################################################
-- A log of commands having been used
-- #############################################################################
CREATE TABLE `command_log`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `commandID` INT UNSIGNED NOT NULL,
  `datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`commandID`) REFERENCES `command`(`id`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`id`)
) ENGINE = InnoDB;

-- #############################################################################
-- Insert a log entry about a command having been used
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_log_create`(
  IN in_name VARCHAR(64),
  IN in_username VARCHAR(25)
)
BEGIN
  INSERT INTO `command_log`(`commandID`, `userID`)
  VALUES(
    (SELECT `id` FROM `command` WHERE `name` = in_name),
    (SELECT `id` FROM `user` WHERE `username` = in_username)
  );
END //
DELIMITER ;
