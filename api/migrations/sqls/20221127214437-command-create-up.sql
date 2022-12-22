CREATE PROCEDURE `command_create`(
  IN in_name VARCHAR(64),
  IN in_command VARCHAR(500),
  IN in_description VARCHAR(255)
)
BEGIN
  INSERT INTO `command`(`name`, `command`, `description`)
  VALUES(in_name, in_command, in_description);
END;
