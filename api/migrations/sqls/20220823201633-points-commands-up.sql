-- DELETE ME
INSERT INTO `command`(`name`, `command`, `description`)
VALUES
  (
    'points',
    null,
    'Display the amount of points you have. Optionally supply a different username to see their points.'
  ),
  (
    'pointsgamble',
    null,
    'Roll a 20-sided dice. If you roll above 10, the points you gambled are doubled, otherwise the points are lost.'
  ),
  (
    'pointsgive',
    null,
    'Give an amount of your own points to another user.'
  ),
  (
    'pointstop',
    null,
    'Displays the top 10 points leaders. Optionally supply an amount to show up to that many users.'
  );

SELECT `id` INTO @COMMAND_ID_POINTS FROM `command` WHERE `name` = 'points';
SELECT `id` INTO @COMMAND_ID_POINTS_GAMBLE FROM `command` WHERE `name` = 'pointsgamble';
SELECT `id` INTO @COMMAND_ID_POINTS_GIVE FROM `command` WHERE `name` = 'pointsgive';
SELECT `id` INTO @COMMAND_ID_POINTS_TOP FROM `command` WHERE `name` = 'pointstop';

INSERT INTO `command_keyword`(`keyword`, `commandID`, `isPrimary`)
VALUES
  ('points', @COMMAND_ID_POINTS, 1),
  ('score', @COMMAND_ID_POINTS, 0),
  ('pointsgamble', @COMMAND_ID_POINTS_GAMBLE, 1),
  ('gamble', @COMMAND_ID_POINTS_GAMBLE, 0),
  ('wager', @COMMAND_ID_POINTS_GAMBLE, 0),
  ('pointsgive', @COMMAND_ID_POINTS_GIVE, 1),
  ('give', @COMMAND_ID_POINTS_GIVE, 0),
  ('pointstop', @COMMAND_ID_POINTS_TOP, 1),
  ('leaderboard', @COMMAND_ID_POINTS_TOP, 0),
  ('scores', @COMMAND_ID_POINTS_TOP, 0),
  ('top', @COMMAND_ID_POINTS_TOP, 0);
