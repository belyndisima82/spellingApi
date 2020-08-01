var express = require("express");
var bodyParser = require("body-parser");
var dictionaryController = require("./controllers/dictionaryController");

const app = express();

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next(); 
};

app.use(allowCrossDomain);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({
  type: ["application/json"]
}));

app.get("/random", dictionaryController.getRandom);
app.post("/word", dictionaryController.post);
app.get("/spelling", dictionaryController.get);


app.use(function(err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  if (err.errors) {
    res.send({ errors: err.errors });
  } else {
    res.end();
  }
});

app.listen(process.env.PORT || 3002, () => {
  console.log(`Listening at http://localhost:3002/`);
});