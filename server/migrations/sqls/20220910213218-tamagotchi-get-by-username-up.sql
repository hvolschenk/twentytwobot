CREATE PROCEDURE `tamagotchi_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  SELECT
    `tamagotchi`.`id` AS `id`,
    `tamagotchi`.`userID` AS `userID`,
    `tamagotchi`.`tamagotchiTypeID` AS `tamagotchiTypeID`,
    `tamagotchi`.`name` AS `name`,
    `tamagotchi`.`food` AS `food`,
    `tamagotchi`.`entertainment` AS `entertainment`,
    `tamagotchi`.`clean` AS `clean`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateCreated`) * 1000 as `dateCreated`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossFood`) * 1000 as `dateLossFood`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossEntertainment`) * 1000 as `dateLossEntertainment`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossClean`) * 1000 as `dateLossClean`,
    `tamagotchi`.`isAlive`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateDied`) * 1000 as `dateDied`,
    `user`.`username` AS `username`,
    `user`.`displayName` AS `displayName`
  FROM `tamagotchi`
  JOIN `user` ON `tamagotchi`.`userID` = `user`.`id`
  WHERE `user`.`id` = @USER_ID
  AND `tamagotchi`.`isAlive` = 1;
END;
