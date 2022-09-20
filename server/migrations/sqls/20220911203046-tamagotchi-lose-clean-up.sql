CREATE PROCEDURE `tamagotchi_lose_clean`(
  IN in_id INT UNSIGNED,
  IN in_clean TINYINT UNSIGNED
)
BEGIN
  UPDATE `tamagotchi`
  SET
    `clean` = IF(`clean` <= in_clean, 0, `clean` - in_clean),
    `dateLossClean` = CURRENT_TIMESTAMP
  WHERE `id` = in_id;
END;
