CREATE PROCEDURE `shoutout_log_get_latest_by_username_to`(
  in_usernameTo VARCHAR(25)
)
BEGIN
  SELECT
    `id`,
    `usernameFrom`,
    `usernameTo`,
    UNIX_TIMESTAMP(`dateShouted`) * 1000 as `dateShouted`
  FROM `shoutout_log`
  WHERE `usernameTo` = in_usernameTo
  ORDER BY `dateShouted` DESC
  LIMIT 1;
END;
