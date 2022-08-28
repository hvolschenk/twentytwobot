INSERT INTO `timer`(`name`, `intervalSeconds`)
VALUES
  ('bot', (60 * 23)),
  ('engagement', (60 * 20));

SELECT `id` INTO @TIMER_ID_BOT FROM `timer` WHERE `name` = 'bot';
SELECT `id` INTO @TIMER_ID_ENGAGEMENT FROM `timer` WHERE `name` = 'engagement';

INSERT INTO `timer_message`(`timerID`, `message`)
VALUES
  (@TIMER_ID_BOT, 'I am a !bot. Beep boop.'),
  (@TIMER_ID_BOT, 'I might just be able to !help.'),
  (@TIMER_ID_BOT, 'I listen to !commands because I am a !bot.'),
  (@TIMER_ID_BOT, '00100001 01100010 01101111 01110100'),
  (@TIMER_ID_ENGAGEMENT, 'Pineapple on pizza, yay or nay?'),
  (@TIMER_ID_ENGAGEMENT, 'Should toilet paper hang over or under the roll?'),
  (@TIMER_ID_ENGAGEMENT, 'Cake or ice cream?'),
  (@TIMER_ID_ENGAGEMENT, 'Do dogs dream?'),
  (@TIMER_ID_ENGAGEMENT, 'Are you a dog person or a cat person?'),
  (@TIMER_ID_ENGAGEMENT, 'If you could live forver, would you?'),
  (@TIMER_ID_ENGAGEMENT, 'No one should ever tell a lie. Agree or disagree?'),
  (@TIMER_ID_ENGAGEMENT, 'Fries with ketchup or mayonnaise?'),
  (@TIMER_ID_ENGAGEMENT, 'Sweet or savoury?'),
  (@TIMER_ID_ENGAGEMENT, 'Cereal first or milk first?'),
  (@TIMER_ID_ENGAGEMENT, 'How do you take your coffee?'),
  (@TIMER_ID_ENGAGEMENT, 'Are clowns scary or funny?'),
  (@TIMER_ID_ENGAGEMENT, 'Do you make the bed in the morning?'),
  (@TIMER_ID_ENGAGEMENT, 'Who would really win in a fight, werewolves or vampires?'),
  (@TIMER_ID_ENGAGEMENT, 'Which is the best day of the week?'),
  (@TIMER_ID_ENGAGEMENT, 'Is there other life out there in the universe?'),
  (@TIMER_ID_ENGAGEMENT, 'What is your spirit animal? Mine is a bear. No-one messes with a bear.'),
  (@TIMER_ID_ENGAGEMENT, 'Thin crust or thick crust?'),
  (@TIMER_ID_ENGAGEMENT, 'What do you do to relax?'),
  (@TIMER_ID_ENGAGEMENT, 'Which is your favourite season?'),
  (@TIMER_ID_ENGAGEMENT, 'If you were the host of a talk show, who would be your first guest?'),
  (@TIMER_ID_ENGAGEMENT, 'Who is your role model?'),
  (@TIMER_ID_ENGAGEMENT, 'Do you sing in the shower?'),
  (@TIMER_ID_ENGAGEMENT, 'Are you a morning person or a night owl?'),
  (@TIMER_ID_ENGAGEMENT, 'What is your favourite number? I am sure you can guess what mine is.'),
  (@TIMER_ID_ENGAGEMENT, 'Do you have any tattoos?'),
  (@TIMER_ID_ENGAGEMENT, 'If you could hop on a plane right now, where would you go?'),
  (@TIMER_ID_ENGAGEMENT, 'Who in your life brings you the most joy?'),
  (@TIMER_ID_ENGAGEMENT, 'What smell brings back great memories?'),
  (@TIMER_ID_ENGAGEMENT, 'What cartoons did you watch as a child?');
