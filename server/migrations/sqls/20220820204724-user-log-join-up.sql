CREATE PROCEDURE `user_log_join`(
  IN in_username VARCHAR(25)
)
BEGIN
  INSERT INTO `user_log`(`userId`) VALUES((SELECT `id` FROM `user` WHERE `username` = in_username));
END;
