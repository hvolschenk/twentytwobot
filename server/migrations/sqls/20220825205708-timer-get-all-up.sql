CREATE PROCEDURE `timer_get_all`()
BEGIN
  SELECT `id`, `name`, `intervalSeconds` FROM `timer`;
END;
