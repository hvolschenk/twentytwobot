CREATE PROCEDURE `command_keyword_delete_by_command_id`(
  IN in_commandID INT UNSIGNED
)
BEGIN
  DELETE FROM `command_keyword` WHERE `commandID` = in_commandID;
END;
