CREATE PROCEDURE `command_get_by_name`(
  IN in_name VARCHAR(64)
)
BEGIN
  SELECT `id`, `name`, `command`, `description`
  FROM `command`
  WHERE `name` = in_name;
END;
