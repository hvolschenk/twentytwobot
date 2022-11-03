CREATE PROCEDURE `tamagotchi_care`(
  IN in_id INT UNSIGNED,
  IN in_clean TINYINT UNSIGNED,
  IN in_entertainment TINYINT UNSIGNED,
  IN in_food TINYINT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `clean` = IF(in_clean IS NULL, `clean`, LEAST(10, `clean` + in_clean)),
    `entertainment` = IF(in_entertainment IS NULL, `entertainment`, LEAST(10, `entertainment` + in_entertainment)),
    `food` = IF(in_food IS NULL, `food`, LEAST(10, `food` + in_food))
  WHERE `id` = in_id;
END;
