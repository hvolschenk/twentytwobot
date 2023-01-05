CREATE PROCEDURE `timer_delete`(
  IN in_id INT UNSIGNED
)
BEGIN
  DELETE FROM `timer` WHERE `id` = in_id;
END;
