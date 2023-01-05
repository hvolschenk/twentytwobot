CREATE PROCEDURE `timer_update`(
  IN in_id INT UNSIGNED,
  IN in_name VARCHAR(255),
  IN in_intervalSeconds SMALLINT UNSIGNED
)
BEGIN
  UPDATE `timer`
  SET
    `name` = in_name,
    `intervalSeconds` = in_intervalSeconds
  WHERE `id` = in_id;
END;
