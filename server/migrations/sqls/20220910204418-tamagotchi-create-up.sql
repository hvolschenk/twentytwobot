CREATE PROCEDURE `tamagotchi_create`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `id` INTO @USER_ID FROM `user` WHERE `username` = in_username;

  SELECT `displayName` INTO @USER_DISPLAY_NAME FROM `user` WHERE `id` = @USER_ID;

  SELECT `id` INTO @TAMAGOTCHI_TYPE_ID FROM `tamagotchi_type` ORDER BY RAND() LIMIT 1;

  INSERT INTO `tamagotchi`(`userID`, `tamagotchiTypeID`, `name`)
  VALUES(@USER_ID, @TAMAGOTCHI_TYPE_ID, @USER_DISPLAY_NAME);
END;
