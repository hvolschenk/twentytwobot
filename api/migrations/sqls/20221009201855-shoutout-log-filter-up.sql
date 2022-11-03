CREATE PROCEDURE `shoutout_log_filter`(
  IN in_usernameFrom VARCHAR(32),
  IN in_usernameTo VARCHAR(32),
  IN in_limit TINYINT UNSIGNED
)
BEGIN
  SELECT
    `id`,
    `usernameFrom`,
    `usernameTo`,
    UNIX_TIMESTAMP(`dateShouted`) * 1000 as `dateShouted`
  FROM `shoutout_log`
  WHERE `usernameTo` = in_usernameTo
  AND IF(in_usernameFrom IS NOT NULL, `usernameFrom` = in_usernameFrom, 1)
  ORDER BY `dateShouted` DESC
  LIMIT in_limit;
END;
