CREATE PROCEDURE `tamagotchi_update`(
  IN in_id INT UNSIGNED,
  IN in_name VARCHAR(32)
)
BEGIN
  UPDATE `tamagotchi`
  SET `name` = in_name
  WHERE `id` = in_id;
END;
