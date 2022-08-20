CREATE PROCEDURE `user_get_last_game_played_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT `lastGamePlayed` FROM `user` WHERE `username` = in_username;
END;
