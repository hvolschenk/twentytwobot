CREATE PROCEDURE `timer_message_get_random_by_timer_id`(
  IN in_timerID INT UNSIGNED
)
BEGIN
  SELECT `id`, `timerID`, `message`
  FROM `timer_message`
  WHERE `timerID` = in_timerID
  ORDER BY RAND()
  LIMIT 1;
END;
