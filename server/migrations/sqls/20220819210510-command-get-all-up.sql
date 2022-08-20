CREATE PROCEDURE `command_get_all`()
BEGIN
  SELECT
    `command_keyword`.`id` AS `id`,
    `command`.`id` AS `commandID`,
    `command_keyword`.`keyword` AS `keyword`,
    `command`.`command` AS `command`
  FROM `command_keyword`
  JOIN `command` ON `command_keyword`.`commandID` = `command`.`id`;
END;
