CREATE PROCEDURE `timer_message_delete_by_timer_id`(
  IN in_timerID INT UNSIGNED
)
BEGIN
  DELETE FROM `timer_message` WHERE `timerID` = in_timerID;
END;
