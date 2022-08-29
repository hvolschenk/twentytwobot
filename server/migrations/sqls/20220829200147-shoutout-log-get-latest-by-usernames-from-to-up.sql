CREATE PROCEDURE `shoutout_log_get_latest_by_usernames_from_to`(
  in_usernameFrom VARCHAR(25),
  in_usernameTo VARCHAR(25)
)
BEGIN
  SELECT
    `id`,
    `usernameFrom`,
    `usernameTo`,
    UNIX_TIMESTAMP(`dateShouted`) * 1000 as `dateShouted`
  FROM `shoutout_log`
  WHERE `usernameFrom` = in_usernameFrom
  AND `usernameTo` = in_usernameTo
  ORDER BY `dateShouted` DESC
  LIMIT 1;
END;
