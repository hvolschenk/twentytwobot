CREATE PROCEDURE `tamagotchi_entertain`(
  IN in_username VARCHAR(25),
  IN in_entertainment TINYINT UNSIGNED
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  UPDATE `tamagotchi`
  SET `entertainment` = LEAST(10, `entertainment` + in_entertainment)
  WHERE `userID` = @USER_ID
  AND `isAlive` = 1;
END;
