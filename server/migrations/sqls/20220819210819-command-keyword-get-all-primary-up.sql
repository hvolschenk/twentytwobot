CREATE PROCEDURE `command_keyword_get_all_primary`()
BEGIN
  SELECT `keyword` FROM `command_keyword` WHERE `isPrimary` = 1;
END;
