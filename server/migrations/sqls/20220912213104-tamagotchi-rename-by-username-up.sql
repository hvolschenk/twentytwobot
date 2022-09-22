CREATE PROCEDURE `tamagotchi_rename_by_username`(
  IN in_username VARCHAR(25),
  IN in_name VARCHAR(32)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  UPDATE `tamagotchi` SET `name` = in_name WHERE `userID` = @USER_ID AND `isAlive` = 1;
END;
