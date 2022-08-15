-- Each command can have multiple keyword to invoke.
-- Invocations count against the command by any keyword,
-- and not against the keyword itself.

-- #############################################################################
-- Stores the list of commands
-- #############################################################################
CREATE TABLE `command`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(64) NOT NULL,
  `command` VARCHAR(500) NULL,
  `description` VARCHAR(255) NOT NULL,
  UNIQUE INDEX(`name`)
) ENGINE = InnoDB;

-- Insert the initial list of commands
INSERT INTO `command`(`name`, `command`, `description`)
VALUES
  (
    'bot',
    'Hey, I am @twentytwobot. Built by @22atreyu22 for (t)his channel. Type !commands or !help to see what I can do.',
    'Explain what @twentytwobot is and does'
  ),
  (
    'commands',
    null,
    'Show a list of all available commands'
  ),
  (
    'goal',
    'Survive as long as possible by using only crafted items. This is still a practice run. More information: https://tinyurl.com/Neo-Native',
    'Show the goal(s) of this particular run'
  ),
  (
    'lurk',
    '@{userDisplayName {username}} is off to go do the thing.',
    'Use this command when you will be online, but uncontactable'
  ),
  (
    'miss',
    'Another miss! That makes it a total of {commandCount miss}.',
    'To lightly mock @22atreyu22 when he misses a shot with a weapon'
  ),
  (
    'shoutout',
    'Shoutout to @{userDisplayName {1}}. They have been supporting my stream, and you should definitely support theirs. They are great! They were last seen playing ''{userLastGamePlayed {1}}''. Click here and give them a follow: https://twitch.tv/{lowercase {replace @||{1}}}',
    'To give a viewer in chat the praise that they deserve'
  ),
  (
    'sprain',
    'Another sprain! I am sure this survivor is made from glass. That makes it {commandCount sprain} sprains already.',
    'To count the amount of times Will/Astrid forget how to walk'
  ),
  (
    'surviving',
    'In 1962 sir Robert Viving invented surviving, also known as Sir Viving''s disease. Thanks to his efforts we are able to enjoy The Long Dark as it is today.',
    'A little joke'
  ),
  (
    'unlurk',
    '@{userDisplayName {username}} is back from doing the thing, yay!',
    'Use this command when you are back and contactable again'
  );

-- #############################################################################
-- Stores the list of command keywords
-- #############################################################################
CREATE TABLE `command_keyword`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `keyword` VARCHAR(32) NOT NULL,
  `commandID` INT UNSIGNED NOT NULL,
  `isPrimary` TINYINT(1) NOT NULL DEFAULT 0,
  UNIQUE INDEX(`keyword`),
  FOREIGN KEY (`commandID`) REFERENCES `command`(`id`),
  INDEX(`isPrimary`)
) ENGINE = InnoDB;

SELECT `id` INTO @COMMAND_ID_BOT FROM `command` WHERE `name` = 'bot';
SELECT `id` INTO @COMMAND_ID_COMMANDS FROM `command` WHERE `name` = 'commands';
SELECT `id` INTO @COMMAND_ID_GOAL FROM `command` WHERE `name` = 'goal';
SELECT `id` INTO @COMMAND_ID_LURK FROM `command` WHERE `name` = 'lurk';
SELECT `id` INTO @COMMAND_ID_MISS FROM `command` WHERE `name` = 'miss';
SELECT `id` INTO @COMMAND_ID_SHOUTOUT FROM `command` WHERE `name` = 'shoutout';
SELECT `id` INTO @COMMAND_ID_SPRAIN FROM `command` WHERE `name` = 'sprain';
SELECT `id` INTO @COMMAND_ID_SURVIVING FROM `command` WHERE `name` = 'surviving';
SELECT `id` INTO @COMMAND_ID_UNLURK FROM `command` WHERE `name` = 'unlurk';

INSERT INTO `command_keyword`(`keyword`, `commandID`, `isPrimary`)
VALUES
  ('bot', @COMMAND_ID_BOT, 1),
  ('22bot', @COMMAND_ID_BOT, 0),
  ('twentytwobot', @COMMAND_ID_BOT, 0),
  ('commands', @COMMAND_ID_COMMANDS, 1),
  ('command', @COMMAND_ID_COMMANDS, 0),
  ('help', @COMMAND_ID_COMMANDS, 0),
  ('goal', @COMMAND_ID_GOAL, 1),
  ('lurk', @COMMAND_ID_LURK, 1),
  ('lurkon', @COMMAND_ID_LURK, 0),
  ('miss', @COMMAND_ID_MISS, 1),
  ('shoutout', @COMMAND_ID_SHOUTOUT, 1),
  ('so', @COMMAND_ID_SHOUTOUT, 0),
  ('sprain', @COMMAND_ID_SPRAIN, 1),
  ('ankle', @COMMAND_ID_SPRAIN, 0),
  ('wrist', @COMMAND_ID_SPRAIN, 0),
  ('surviving', @COMMAND_ID_SURVIVING, 1),
  ('unlurk', @COMMAND_ID_UNLURK, 1),
  ('lurkoff', @COMMAND_ID_UNLURK, 0);

-- #############################################################################
-- A log of commands having been used
-- #############################################################################
CREATE TABLE `command_log`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `commandID` INT UNSIGNED NOT NULL,
  `datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` INT UNSIGNED NOT NULL,
  FOREIGN KEY (`commandID`) REFERENCES `command`(`id`),
  FOREIGN KEY (`userID`) REFERENCES `user`(`id`)
) ENGINE = InnoDB;

-- #############################################################################
-- Fetch a single command
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_get_by_keyword`(
  IN in_command_keyword VARCHAR(32)
)
BEGIN
  SELECT
    `command`.`id` AS `id`,
    `command`.`name` AS `name`,
    `command`.`command` AS `command`,
    `command`.`description` AS `description`
  FROM `command`
  JOIN `command_keyword` ON `command`.`id` = `command_keyword`.`commandID`
  WHERE `command_keyword`.`keyword` = in_command_keyword;
END //
DELIMITER ;

-- #############################################################################
-- Fetch all keywords with their respective commands
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_get_all`()
BEGIN
  SELECT
    `command_keyword`.`id` AS `id`,
    `command`.`id` AS `commandID`,
    `command_keyword`.`keyword` AS `keyword`,
    `command`.`command` AS `command`
  FROM `command_keyword`
  JOIN `command` ON `command_keyword`.`commandID` = `command`.`id`;
END //
DELIMITER ;

-- #############################################################################
-- Insert a log entry about a command having been used
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_log_create`(
  IN in_command_id INT UNSIGNED,
  IN in_username VARCHAR(25)
)
BEGIN
  INSERT INTO `command_log`(`commandID`, `userID`)
  VALUES(
    in_command_id,
    (SELECT `id` FROM `user` WHERE `username` = in_username)
  );
END //
DELIMITER ;

-- #############################################################################
-- Get a list of primary command names
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_keyword_get_all_primary`()
BEGIN
  SELECT `keyword` FROM `command_keyword` WHERE `isPrimary` = 1;
END //
DELIMITER ;

-- #############################################################################
-- Get all command keywords by command ID
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_keyword_get_all_by_command_id`(
  IN in_command_id INT UNSIGNED
)
BEGIN
  SELECT `id`, `keyword`, `commandID`, `isPrimary`
  FROM `command_keyword`
  WHERE `commandID` = in_command_id;
END //
DELIMITER ;

-- #############################################################################
-- Get the number of times a command was invoked
-- #############################################################################
DELIMITER //
CREATE PROCEDURE `command_get_invocations_count`(
  IN in_command_keyword VARCHAR(32)
)
BEGIN
  SELECT COUNT(`command_log`.`id`) as `count`
  FROM `command_log`
  JOIN `command_keyword` ON `command_log`.`commandID` = `command_keyword`.`commandID`
  WHERE `command_keyword`.`keyword` = in_command_keyword;
END //
DELIMITER ;
