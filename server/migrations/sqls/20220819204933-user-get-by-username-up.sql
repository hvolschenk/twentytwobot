CREATE PROCEDURE `user_get_by_username`(
  IN in_username VARCHAR(25)
)
BEGIN
  SELECT
    `id`,
    UNIX_TIMESTAMP(`dateCreated`) * 1000 as `dateCreated`,
    UNIX_TIMESTAMP(`dateUpdated`) * 1000 as `dateUpdated`,
    `username`,
    `displayName`,
    `twitchID`,
    `lastGamePlayed`
  FROM
    `user`
  WHERE
    `username` = in_username;
END;
