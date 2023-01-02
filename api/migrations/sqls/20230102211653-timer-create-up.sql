CREATE PROCEDURE `timer_create`(
  IN in_name VARCHAR(255),
  IN in_intervalSeconds SMALLINT UNSIGNED
)
BEGIN
  INSERT INTO `timer`(`name`, `intervalSeconds`)
  VALUES(in_name, in_intervalSeconds);
END;
