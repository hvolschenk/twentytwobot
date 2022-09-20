CREATE PROCEDURE `tamagotchi_lose_entertainment`(
  IN in_id INT UNSIGNED,
  IN in_entertainment TINYINT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `entertainment` = IF(`entertainment` <= in_entertainment, 0, `entertainment` - in_entertainment),
    `dateLossEntertainment` = CURRENT_TIMESTAMP
  WHERE `id` = in_id;
END;
