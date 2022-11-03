CREATE PROCEDURE `user_log_part`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  UPDATE `user_log`
  SET `dateParted` = CURRENT_TIMESTAMP
  WHERE `userID` = @USER_ID
  ORDER BY `dateJoined` DESC
  LIMIT 1;
END;
