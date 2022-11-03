CREATE PROCEDURE `points_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  INSERT IGNORE INTO `points`(`userID`) VALUES(@USER_ID);

  SELECT
    `id`
    UNIX_TIMESTAMP(`dateUpdated`) * 1000 as `dateUpdated`,
    `userID`,
    `points`
  FROM `points`
  WHERE `userID` = @USER_ID;
END;
