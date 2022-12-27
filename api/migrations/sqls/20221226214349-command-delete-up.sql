CREATE PROCEDURE `command_delete`(
  IN in_id INT UNSIGNED
)
BEGIN
  DELETE FROM `command` WHERE `id` = in_id;
END;
