CREATE PROCEDURE `command_get_invocations_count`(
  IN in_command_keyword VARCHAR(32)
)
BEGIN
  SELECT COUNT(`command_log`.`id`) as `count`
  FROM `command_log`
  JOIN `command_keyword` ON `command_log`.`commandID` = `command_keyword`.`commandID`
  WHERE `command_keyword`.`keyword` = in_command_keyword;
END;
