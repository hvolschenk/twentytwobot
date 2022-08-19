CREATE PROCEDURE `command_get_by_keyword`(
  IN in_command_keyword VARCHAR(32)
)
BEGIN
  SELECT
    `command`.`id` AS `id`,
    `command`.`name` AS `name`,
    `command`.`command` AS `command`,
    `command`.`description` AS `description`
  FROM `command`
  JOIN `command_keyword` ON `command`.`id` = `command_keyword`.`commandID`
  WHERE `command_keyword`.`keyword` = in_command_keyword;
END;
