CREATE PROCEDURE `user_log_part`(
  IN in_username VARCHAR(25)
)
BEGIN
  UPDATE `user_log`
  SET `dateParted` = CURRENT_TIMESTAMP
  WHERE `userID` = (SELECT `id` FROM `user` WHERE `username` = in_username)
  ORDER BY `dateJoined` DESC
  LIMIT 1;
END;
