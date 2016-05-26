var express = require('express');
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
//db
mongoose.connect("mongodb://localhost/newPoll");
//mongoose.connect("mongodb://heroku_c3c0n4nt:rgj9aa3tjfeketnkg434mb1dnm@ds011863.mlab.com:11863/heroku_c3c0n4nt");
//controller
pollController = require("./controller/polls");
authController = require('./controller/auth');

//middlewares
app.use(bodyParser.urlencoded({exteded:true}));
app.use(bodyParser.json());
var router = express.Router();
app.use('/api',router);
app.use(expressSession({
secret:"this is a secret"
}))
app.use(passport.initialize());
app.use(passport.session());

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

app.get('/login/twitter/callback',
authController.authenticate,
function(req,res){
  console.log("LOGGED IN");
  console.log(req.session["_passport"]);
  res.redirect('/');
})

app.use('/',express.static(__dirname+'/client'));


var PORT = process.env.PORT ||3000;

app.listen(PORT,function(){
  console.log("polling app is starting at PORT "+PORT);
})
