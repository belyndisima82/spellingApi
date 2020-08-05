const DictionaryRepository = require("../repositories/dictionaryRepository");
const models = require('../models');

exports.getRandom = function(req, res) {
    DictionaryRepository.getRandom()
      .then(function(word) {
        var pronunciation_url = 'https://text-to-speech-demo.ng.bluemix.net/api/v3/synthesize?text=' + word.word + '&voice=en-US_AllisonV3Voice&download=true&accept=audio%2Fmp3';
        var destructured = word.word.split('').sort(function(){return 0.5-Math.random()}).join('');
        var spelling = new models.Spelling({
          id: word.id,
          destructured,
          pronunciation_url
        });
          res.status(200).send(spelling);
      }).catch(function(error) {
          res.status(400).send(error);
      });
};

exports.post = function(req, res) {
    const body = req.body;
    if(body.word) {
        const word = body.word;
        DictionaryRepository.insert(word)
          .then(function(word) {
              res.status(201).send(word);
          }).catch(function(error) {
              res.status(400).send(error);
          });
    } else {
        res.status(400).send("bad request");
    }
};

exports.get = function(req, res) {
    const query = req.query;
    if(query.id && query.speltWord) {
        const id = query.id;
        const speltWord = query.speltWord;
        DictionaryRepository.findById(id)
          .then(function(word) {
              if (word.word == speltWord) {
                res.status(200).send({
                    correctWord: word.word,
                    spelling: 'correct'
                });
              } else {
                res.status(200).send({
                    correctWord: word.word,
                    spelling: 'fail'
                });
              }
          }).catch(function(error) {
              res.status(400).send(error);
          });
    } else {
        res.status(400).send("bad request");
    }
};