CREATE PROCEDURE `tamagotchi_die_by_id`(
  IN in_id INT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `isAlive` = 0,
    `dateDied` = CURRENT_TIMESTAMP
  WHERE `id` = in_id;
END;
