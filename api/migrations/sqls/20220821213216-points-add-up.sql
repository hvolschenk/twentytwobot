-- ~0 provides a shortcut to "maximum unsigned bigint" size
-- https://stackoverflow.com/a/2679152
CREATE PROCEDURE `points_add`(
  IN in_points BIGINT UNSIGNED,
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  INSERT IGNORE INTO `points`(`userID`) VALUES(@USER_ID);

  UPDATE `points`
  SET `points` = LEAST(~0, `points` + in_points)
  WHERE `userID` = @USER_ID;
END;
