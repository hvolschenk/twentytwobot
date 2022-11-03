CREATE PROCEDURE `command_log_create`(
  IN in_command_id INT UNSIGNED,
  IN in_username VARCHAR(25)
)
BEGIN
  INSERT INTO `command_log`(`commandID`, `userID`)
  VALUES(
    in_command_id,
    (SELECT `id` FROM `user` WHERE `username` = in_username)
  );
END;
