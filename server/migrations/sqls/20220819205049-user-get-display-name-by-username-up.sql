CREATE PROCEDURE `user_get_display_name_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `displayName` FROM `user` WHERE `username` = in_username;
END;
