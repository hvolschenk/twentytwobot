CREATE PROCEDURE `command_get_all`()
BEGIN
  SELECT `id`, `name`, `command`, `description` FROM `command`;
END;
