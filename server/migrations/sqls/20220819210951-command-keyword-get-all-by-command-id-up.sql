CREATE PROCEDURE `command_keyword_get_all_by_command_id`(
  IN in_command_id INT UNSIGNED
)
BEGIN
  SELECT `id`, `keyword`, `commandID`, `isPrimary`
  FROM `command_keyword`
  WHERE `commandID` = in_command_id;
END;
