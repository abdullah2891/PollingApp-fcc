var express = require('express');
require('dotenv').config();
var app =express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
var cors  = require('cors');
var session = require('express-session');
const jwt = require('jsonwebtoken')


//db
//mongoose.connect("mongodb://localhost/newPoll");
mongoose.connect(process.env.mongodb_uri);
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
  .post(authController.authenticate,pollController.createPoll)
  .get(pollController.getAllPoll)
  .delete(authController.authenticate,pollController.deletePoll);

router.route('/test')
  .get(authController.authenticate,pollController.test)

router.route('/cleanAll')
.get(pollController.cleanAll);

router.route('/vote/cast')
.post(authController.authenticate, pollController.castVote);


app.get('/api/profile', authController.authenticate, (req, res)=>{
  res.json(req.user)
})


app.get('/login/twitter/callback',passport.authenticate('twitter',{
    failureRedirect:'/#/login',
    session: false
  }), 
  (req, res)=>{
    const token = jwt.sign(req.user , process.env.secret, {expiresIn: '1h'})
    res.redirect(`${process.env.frontend_url}/login/callback?token=` + token);
  })

app.get('/auth/twitter',
  passport.authenticate('twitter',{
    failureRedirect:'/#/login',
    session: false
  })
);
//app.use('/',express.static(__dirname+'/client'));


var PORT = process.env.PORT ||3001;

app.listen(PORT,function(){
  console.log("polling app is starting at PORT "+PORT);
})
