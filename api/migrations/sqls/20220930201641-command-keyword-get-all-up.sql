CREATE PROCEDURE `command_keyword_get_all`()
BEGIN
  SELECT `id`, `keyword`, `commandID`, `isPrimary`
  FROM `command_keyword`;
END;
