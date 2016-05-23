var express = require('express');
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//db
mongoose.connect("mongodb://localhost/newPoll");

//controller
pollController = require("./controller/polls");


//middlewares
app.use(bodyParser.urlencoded({exteded:true}));
app.use(bodyParser.json());
var router = express.Router();
app.use('/api',router);

//routes

router.route('/poll')
.post(pollController.createPoll)
.get(pollController.getAllPoll);

router.route('/cleanAll')
.get(pollController.cleanAll);

router.route('/vote/cast')
.post(pollController.castVote);

router.route('/vote/:count')
.get(pollController.countVote);

var PORT = process.env.PORT ||3000;

app.listen(PORT,function(){
  console.log("polling app is starting at PORT "+PORT);
})
