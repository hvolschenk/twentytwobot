CREATE PROCEDURE `tamagotchi_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  SELECT
    `id`,
    `userID`,
    `tamagotchiTypeID`,
    `name`,
    `food`,
    `entertainment`,
    `clean`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateCreated`) * 1000 as `dateCreated`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossFood`) * 1000 as `dateLossFood`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossEntertainment`) * 1000 as `dateLossEntertainment`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateLossClean`) * 1000 as `dateLossClean`,
    `isAlive`,
    UNIX_TIMESTAMP(`tamagotchi`.`dateDied`) * 1000 as `dateDied`
  FROM `tamagotchi`
  WHERE `userID` = @USER_ID
  AND `isAlive` = 1;
END;
