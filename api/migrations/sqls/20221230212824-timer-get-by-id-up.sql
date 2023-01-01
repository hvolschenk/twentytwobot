CREATE PROCEDURE `timer_get_by_id`(
  IN in_id INT UNSIGNED
)
BEGIN
  SELECT `id`, `name`, `intervalSeconds`
  FROM `timer`
  WHERE `id` = in_id;
END;
