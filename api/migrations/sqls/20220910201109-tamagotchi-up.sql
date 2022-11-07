CREATE TABLE `tamagotchi_type`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `type` VARCHAR(32) NOT NULL,
  `display` VARCHAR(32) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE `tamagotchi`(
  `id` INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `userID` INT UNSIGNED NOT NULL,
  `tamagotchiTypeID` INT UNSIGNED NOT NULL,
  `name` VARCHAR(32) NOT NULL,
  `food` TINYINT UNSIGNED NOT NULL DEFAULT 7,
  `entertainment` TINYINT UNSIGNED NOT NULL DEFAULT 7,
  `clean` TINYINT UNSIGNED NOT NULL DEFAULT 7,
  `dateCreated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateLossClean` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateLossEntertainment` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `dateLossFood` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isAlive` TINYINT(1) NOT NULL DEFAULT 1,
  `dateDied` TIMESTAMP NULL,
  FOREIGN KEY (`userID`) REFERENCES `user`(`id`)
) ENGINE=InnoDB;

-- DELETE ME (BELOW) (MAYBE??)
INSERT INTO `tamagotchi_type`(`type`, `display`)
VALUES
  ('bear', 'ʕ •ᴥ•ʔ'),
  ('bird', '~(‾▿‾)~'),
  ('cat', '=^_^='),
  ('cthulhu', '^(;,;)^'),
  ('dog', 'U^ェ^U'),
  ('fish', '><((((''>'),
  ('koala', '@( * O * )@'),
  ('mouse', '~~(__^·>'),
  ('panda', 'ヽ(￣(ｴ)￣)ﾉ'),
  ('pig', '^(*(oo)*)^');
