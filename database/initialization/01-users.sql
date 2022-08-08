-- #############################################################################
-- Stores a list of all users
-- #############################################################################
CREATE TABLE `user`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dateCreated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `username` VARCHAR(25) NOT NULL,
  UNIQUE INDEX(`username`)
) ENGINE = InnoDB;

-- #############################################################################
-- Insert a new user
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `user_create`(
  IN in_username VARCHAR(25),
)
BEGIN
	INSERT IGNORE INTO `user`(`username`) VALUES(in_username);
END //
DELIMITER ;
