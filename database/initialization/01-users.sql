-- #############################################################################
-- Stores a list of all users
-- #############################################################################
CREATE TABLE `user`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dateCreated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` VARCHAR(25) NOT NULL,
  `displayName` VARCHAR(25) NOT NULL,
  `twitchID` VARCHAR(32) NOT NULL,
  `lastGamePlayed` VARCHAR(255) NOT NULL,
  UNIQUE INDEX(`username`)
) ENGINE = InnoDB;

-- #############################################################################
-- Insert a new user
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `user_create`(
  IN in_username VARCHAR(25),
  IN in_displayName VARCHAR(25),
  IN in_twitchID VARCHAR(32),
  IN in_lastGamePlayed VARCHAR(255)
)
BEGIN
  INSERT IGNORE INTO `user`(`username`, `displayName`, `twitchID`, `lastGamePlayed`)
  VALUES(in_username, in_displayName, in_twitchID, in_lastGamePlayed);
END //
DELIMITER ;

-- #############################################################################
-- Update an existsing user's details
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `user_update`(
  IN in_id INT UNSIGNED,
  IN in_displayName VARCHAR(25),
  IN in_twitchID VARCHAR(32),
  IN in_lastGamePlayed VARCHAR(255)
)
BEGIN
  UPDATE
    `user`
  SET
    `displayName` = in_displayName,
    `twitchID` = in_twitchID,
    `lastGamePlayed` = in_lastGamePlayed
  WHERE
    `id` = in_id;
END //
DELIMITER ;

-- #############################################################################
-- Fetch a user's details given a username
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `user_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT
    `id`, `dateCreated`, `username`, `displayName`, `twitchID`, `lastGamePlayed`
  FROM
    `user`
  WHERE
    `username` = in_username;
END //
DELIMITER ;
