CREATE PROCEDURE `shoutout_log_add`(
  in_usernameFrom VARCHAR(25),
  in_usernameTo VARCHAR(25)
)
BEGIN
  INSERT INTO `shoutout_log`(`usernameFrom`, `usernameTo`)
  VALUES (in_usernameFrom, in_usernameTo);
END;
