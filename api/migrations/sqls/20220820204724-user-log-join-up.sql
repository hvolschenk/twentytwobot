CREATE PROCEDURE `user_log_join`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  INSERT INTO `user_log`(`userId`) VALUES(@USER_ID);
END;
