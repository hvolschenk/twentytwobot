CREATE PROCEDURE `points_get_top`(
  IN in_count TINYINT UNSIGNED
)
BEGIN
  SELECT
    `id`,
    UNIX_TIMESTAMP(`dateUpdated`) * 1000 as `dateUpdated`,
    `userID`,
    `points`
  FROM `points`
  ORDER BY `points` DESC
  LIMIT in_count;
END;
