CREATE PROCEDURE `tamagotchi_type_get_by_id`(
  IN in_id INT UNSIGNED
)
BEGIN
  SELECT `id`, `type`, `display` FROM `tamagotchi_type` WHERE `id` = in_id;
END;
