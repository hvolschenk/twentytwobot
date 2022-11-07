CREATE PROCEDURE `user_get_by_id`(
  IN in_id INT UNSIGNED
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
    `id` = in_id;
END;
