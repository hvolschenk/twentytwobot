CREATE PROCEDURE `tamagotchi_neglect`(
  IN in_id INT UNSIGNED,
  IN in_clean TINYINT UNSIGNED,
  IN in_entertainment TINYINT UNSIGNED,
  IN in_food TINYINT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `clean` = IF(
      in_clean IS NOT NULL,
      IF(in_clean >= `clean`, 0, `clean` - in_clean),
      `clean`
    ),
    `entertainment` = IF(
      in_entertainment IS NOT NULL,
      IF(in_entertainment >= `entertainment`, 0, `entertainment` - in_entertainment),
      `entertainment`
    ),
    `food` = IF(
      in_food IS NOT NULL,
      IF(in_food >= `food`, 0, `food` - in_food),
      `food`
    ),
    `dateLossClean` = IF(in_clean IS NOT NULL, CURRENT_TIMESTAMP, `dateLossClean`),
    `dateLossEntertainment` = IF(
      in_entertainment IS NOT NULL,
      CURRENT_TIMESTAMP,
      `dateLossEntertainment`
    ),
    `dateLossFood` = IF(in_food IS NOT NULL, CURRENT_TIMESTAMP, `dateLossFood`)
  WHERE `id` = in_id;
END;
