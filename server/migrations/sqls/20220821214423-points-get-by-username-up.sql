CREATE PROCEDURE `points_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  INSERT IGNORE INTO `points`(`userID`) VALUES(@USER_ID);

  SELECT
    `points`.`id` AS `id`,
    UNIX_TIMESTAMP(`points`.`dateUpdated`) * 1000 as `dateUpdated`,
    `points`.`userID` AS `userID`,
    `points`.`points` AS `points`,
    `user`.`username` AS `username`,
    `user`.`displayName` AS `displayName`
  FROM `points`
  JOIN `user` ON `points`.`userID` = `user`.`id`
  WHERE `user`.`username` = in_username;
END;
