CREATE PROCEDURE `points_remove`(
  IN in_points BIGINT UNSIGNED,
  IN in_username VARCHAR(22)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  INSERT IGNORE INTO `points`(`userID`) VALUES(@USER_ID);

  UPDATE `points`
  SET `points` = GREATEST(0, `points` - in_points)
  WHERE `userID` = @USER_ID;
END;
