const connection = require('./connections/mysql');

connection.query("\
  CREATE TABLE `dictionary` ( \
    `id` int NOT NULL AUTO_INCREMENT, \
    `word` varchar(45) NOT NULL, \
    PRIMARY KEY (`id`), \
    UNIQUE KEY `word` (`word`) \
  )", function(err, res) {
    console.error(err);
});