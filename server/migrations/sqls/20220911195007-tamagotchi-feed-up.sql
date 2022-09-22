CREATE PROCEDURE `tamagotchi_feed`(
  IN in_username VARCHAR(25),
  IN in_food TINYINT UNSIGNED
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  UPDATE `tamagotchi`
  SET `food` = LEAST(10, `food` + in_food)
  WHERE `userID` = @USER_ID
  AND `isAlive` = 1;
END;
