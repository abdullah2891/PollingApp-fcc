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
    origin: "http://127.0.0.1:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);


//router configuration

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

router.route('/info')
.get(pollController.loggedIn);


app.get('/info',function(req,res){
  var user = req.user;
  res.json(user);
})

app.get('/login/twitter/callback',
authController.authenticate)


app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    req.login(req.user, function(err){
      console.log(err)
    })
    res.redirect('http:/127.0.0.1:3000/');
  }
);
//app.use('/',express.static(__dirname+'/client'));


var PORT = process.env.PORT ||3001;

app.listen(PORT,function(){
  console.log("polling app is starting at PORT "+PORT);
})
