CREATE PROCEDURE `user_update`(
  IN in_id INT UNSIGNED,
  IN in_displayName VARCHAR(25),
  IN in_twitchID VARCHAR(32),
  IN in_lastGamePlayed VARCHAR(255)
)
BEGIN
  UPDATE
    `user`
  SET
    `displayName` = in_displayName,
    `twitchID` = in_twitchID,
    `lastGamePlayed` = in_lastGamePlayed
  WHERE
    `id` = in_id;
END;
