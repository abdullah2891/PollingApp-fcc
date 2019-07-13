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

passport.use(new twitterStrategy(
  {
    consumerKey:tweetConfig.key,
    consumerSecret: tweetConfig.secret,
    callbackURL: tweetConfig.redirect_url
  },
  function(token,tokenSecret,user,done){
      const formatted_user = {
        id: user.id, 
        screen_name:  user.username,
        name: user.displayName,
        photos: user.photos
      }
      done(null, {user: formatted_user});
  }))


exports.authenticate = passport.authenticate('twitter',{
    failureRedirect:'/#/login',
    session: false
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


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = tweetConfig.secret;

passport.use(new JwtStrategy(opts, function(user, done) {
    done(null , user)
}));
