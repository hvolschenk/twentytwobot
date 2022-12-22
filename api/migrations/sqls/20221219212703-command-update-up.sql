CREATE PROCEDURE `command_update`(
  IN in_id INT UNSIGNED,
  IN in_name VARCHAR(64),
  IN in_command VARCHAR(500),
  IN in_description VARCHAR(255)
)
BEGIN
  UPDATE `command`
  SET
    `name` = in_name,
    `command` = in_command,
    `description` = in_description
  WHERE `id` = in_id;
END;
