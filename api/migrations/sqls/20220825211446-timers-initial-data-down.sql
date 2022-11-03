SELECT `id` INTO @TIMER_ID_BOT FROM `timer` WHERE `name` = 'bot';
SELECT `id` INTO @TIMER_ID_ENGAGEMENT FROM `timer` WHERE `name` = 'engagement';

DELETE FROM `timer` WHERE `id` = @TIMER_ID_BOT;
DELETE FROM `timer` WHERE `id` = @TIMER_ID_ENGAGEMENT;
DELETE FROM `timer_message` WHERE `timerID` = @TIMER_ID_BOT;
DELETE FROM `timer_message` WHERE `timerID` = @TIMER_ID_ENGAGEMENT;
