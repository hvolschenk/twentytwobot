CREATE PROCEDURE `tamagotchi_get_top`(
  IN in_count TINYINT
)
BEGIN
  SELECT
    `id`,
    `userID`,
    `tamagotchiTypeID`,
    `name`,
    `food`,
    `entertainment`,
    `clean`,
    UNIX_TIMESTAMP(`dateCreated`) * 1000 as `dateCreated`,
    UNIX_TIMESTAMP(`dateLossFood`) * 1000 as `dateLossFood`,
    UNIX_TIMESTAMP(`dateLossEntertainment`) * 1000 as `dateLossEntertainment`,
    UNIX_TIMESTAMP(`dateLossClean`) * 1000 as `dateLossClean`,
    `isAlive`,
    UNIX_TIMESTAMP(`dateDied`) * 1000 as `dateDied`
  FROM `tamagotchi`
  ORDER BY TIMESTAMPDIFF(
    DAY,
    `dateCreated`,
    IF(`dateDied` != NULL, `dateDied`, CURRENT_TIMESTAMP)
  ) DESC
  LIMIT in_count;
END;
