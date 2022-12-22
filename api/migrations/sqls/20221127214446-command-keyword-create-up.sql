CREATE PROCEDURE `command_keyword_create`(
  IN in_keyword VARCHAR(32),
  IN in_commandID INT UNSIGNED,
  IN in_isPrimary TINYINT(1)
)
BEGIN
  INSERT INTO `command_keyword`(`keyword`, `commandID`, `isPrimary`)
  VALUES(in_keyword, in_commandID, in_isPrimary);
END;
