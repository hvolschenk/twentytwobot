CREATE PROCEDURE `timer_get_by_id`(
  IN in_timerID INT UNSIGNED
)
BEGIN
  SELECT
    `timer`.`id` AS `id`,
    `timer`.`name` AS `name`,
    `timer`.`intervalSeconds` AS `intervalSeconds`,
    `timer_message`.`message` AS `message`
  FROM `timer_message`
  JOIN `timer` ON `timer_message`.`timerID` = `timer`.`id`
  WHERE `timer`.`id` = in_timerID
  ORDER BY RAND()
  LIMIT 1;
END;
