CREATE PROCEDURE `tamagotchi_clean`(
  IN in_username VARCHAR(25),
  IN in_clean TINYINT UNSIGNED
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  UPDATE `tamagotchi`
  SET `clean` = LEAST(10, `clean` + in_clean)
  WHERE `userID` = @USER_ID
  AND `isAlive` = 1;
END;
