CREATE PROCEDURE `report_stream_viewers`()
BEGIN
  SELECT
    `user_log`.`id` AS `id`,
    `user`.`displayName` AS `displayName`,
    UNIX_TIMESTAMP(`user_log`.`dateJoined`) * 1000 AS `dateJoined`,
    UNIX_TIMESTAMP(`user_log`.`dateParted`) * 1000 AS `dateParted`,
    TIMESTAMPDIFF(MINUTE, `dateJoined`, `dateParted`) as `timeWatchedMinutes`
  FROM `user_log`
  JOIN `user` on `user_log`.`userID` = `user`.`id`
  WHERE `user`.`isBot` = 0
  ORDER BY `dateJoined`;
END;
