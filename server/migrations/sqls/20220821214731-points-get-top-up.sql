CREATE PROCEDURE `points_get_top`(
  IN in_count TINYINT UNSIGNED
)
BEGIN
  SELECT
    `points`.`id` AS `id`,
    UNIX_TIMESTAMP(`points`.`dateUpdated`) * 1000 as `dateUpdated`,
    `points`.`userID` AS `userID`,
    `points`.`points` AS `points`,
    `user`.`username` AS `username`,
    `user`.`displayName` AS `displayName`
  FROM `points`
  JOIN `user` ON `points`.`userID` = `user`.`id`
  ORDER BY
    `points`.`points` DESC,
    `user`.`dateCreated` ASC
  LIMIT in_count;
END;
