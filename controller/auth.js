var passport = require('passport');
var twitterStrategy =  require('passport-twitter').Strategy;
var tweetConfig = require('../config/twitter');

passport.serializeUser(function(user,done){
  console.log("Serializing User");
  done(null,user);
});
passport.deserializeUser(function(user,done){
  console.log("Deserializing");
  done(null,user);
});


passport.use(new twitterStrategy(
  {
    consumerKey:tweetConfig.key,
    consumerSecret: tweetConfig.secret,
    //callbackURL:"https://pollingapp-fcc.herokuapp.com/login/twitter/callback"
    callbackURL:"http://127.0.0.1:3000/login/twitter/callback"
  },
  function(token,tokenSecret,user,done){
    console.log(token);
      done(null,user);
  }))


  exports.authenticate = passport.authenticate('twitter',{failureRedirect:'/#/login'});
  exports.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated())
    {
      console.log("logged in");
      res.send(200,"authenticated");
    }else{
      res.send(400,"User not authenticated");
    }


  }
