CREATE PROCEDURE `command_get_by_id`(
  IN in_id INT UNSIGNED
)
BEGIN
  SELECT `id`, `name`, `command`, `description`
  FROM `command`
  WHERE `id` = in_id;
END;
