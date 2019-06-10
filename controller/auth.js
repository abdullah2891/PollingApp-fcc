var passport = require('passport');
var twitterStrategy =  require('passport-twitter').Strategy;
var tweetConfig = require('../config/twitter');

passport.serializeUser(function(user,done){
  //console.log("Serializing User", user);
  done(null,user);
});
passport.deserializeUser(function(user,done){
  done(null,user);
});

console.log(process.env.redirectURL)
passport.use(new twitterStrategy(
  {
    consumerKey:tweetConfig.key,
    consumerSecret: tweetConfig.secret,
    //callbackURL:"https://pollingapp-fcc.herokuapp.com/login/twitter/callback"
    callbackURL:"https://pollingapp-fcc.herokuapp.com/login/utwitter/callback"
  },
  function(token,tokenSecret,user,done){
    console.log(token);
      done(null,user);
  }))


  exports.authenticate = passport.authenticate('twitter',{
      failureRedirect:'/#/login',
      successRedirect: process.env.redirectURL 
  });

  exports.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated())
    {
      console.log("logged in");
      res.send(200,"authenticated");
    }else{
      res.send(400,"You are not authenticated");
    }
  }
