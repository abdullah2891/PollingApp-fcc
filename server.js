var express = require('express');
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var cors  = require('cors');
var session = require('express-session');
//db
//mongoose.connect("mongodb://localhost/newPoll");
mongoose.connect("mongodb://heroku_rthknr1j:4nnrnftg22o2jd5818c2jkt244@ds017553.mlab.com:17553/heroku_rthknr1j");
//controller
pollController = require("./controller/polls");
authController = require('./controller/auth');

//middlewares
app.use(bodyParser.urlencoded({exteded:true}));
app.use(bodyParser.json());


app.use(session({
    secret: 'sdlfjljrowuroweu',
    cookie: { secure: false }
}));

// parse cookies
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: true, // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": true,
    "Access-Control-Allow-Headers": true,
    "Access-Control-Expose-Headers": true,
    credentials: true // allow session cookie from browser to pass through
  })
);


//router configuration

var router = express.Router();
app.use('/api',router);
//routes

router.route('/poll')
  .post(pollController.createPoll)
  .get(pollController.getAllPoll)
  .delete(pollController.deletePoll);

router.route('/cleanAll')
.get(pollController.cleanAll);

router.route('/vote/cast')
.post(pollController.castVote);

router.route('/profile')
.get(pollController.loggedIn);


app.get('/twitter/callback',(req, res)=>{
  res.redirect('/');
})

app.get('/auth/twitter',
  authController.authenticate);
//app.use('/',express.static(__dirname+'/client'));


var PORT = process.env.PORT ||3001;

app.listen(PORT,function(){
  console.log("polling app is starting at PORT "+PORT);
})
