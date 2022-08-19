CREATE PROCEDURE `user_create`(
  IN in_username VARCHAR(25),
  IN in_displayName VARCHAR(25),
  IN in_twitchID VARCHAR(32),
  IN in_lastGamePlayed VARCHAR(255)
)
BEGIN
  INSERT IGNORE INTO `user`(`username`, `displayName`, `twitchID`, `lastGamePlayed`)
  VALUES(in_username, in_displayName, in_twitchID, in_lastGamePlayed);
END;
