CREATE PROCEDURE `tamagotchi_lose_food`(
  IN in_id INT UNSIGNED,
  IN in_food TINYINT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `food` = IF(`food` <= in_food, 0, `food` - in_food),
    `dateLossFood` = CURRENT_TIMESTAMP
  WHERE `id` = in_id;
END;
