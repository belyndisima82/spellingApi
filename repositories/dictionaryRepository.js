const connection = require('../connections/mysql');
const models = require('../models');

var findById = function(id) {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM dictionary WHERE id = ?", [id], function(error, result) {
            if(error) {
                reject(error);
                return;
            }
            var word = new models.Word(result[0]);
            resolve(word);
        });
    });
};
var getRandom = function() {
    return new Promise(function(resolve, reject) {
        connection.query("SELECT * FROM dictionary ORDER BY RAND() LIMIT 1", function(error, result) {
            if(error) {
                reject(error);
                return;
            }
            var random = {
                word: result[0].word,
                id: result[0].id
            }
            resolve(random);
        });
    });
};
var insert = function(word) {
    return new Promise(function(resolve, reject) {
        connection.query("INSERT INTO dictionary VALUES (NULL, ?)", [word], function(error, result) {
            if(error) {
                reject(error);
                return;
            }
            findById(result.insertId)
                .then(function(word) {
                    resolve(word);
                }).catch(function(error) {
                    reject(error);
                });
        });
    });
};

exports.findById = findById;
exports.getRandom = getRandom;
exports.insert = insert;