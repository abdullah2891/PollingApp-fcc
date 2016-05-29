var poll = require('../models/poll.model');
var vote = require("../models/vote");
var passport = require('passport');


exports.createPoll = function(req,res){
  var newPoll = new poll();
  var entry = req.body;

  newPoll.question = entry.question;

  entry["choice"].forEach(function(choice){
    if(choice!="") newPoll.choice.push({option:choice,vote:0});
  })


  newPoll.user.push("first");
  newPoll.save(function(err,poll){
    if(!err){
      res.json(poll);
    }else{
      res.json(err);
    }
  })

}

exports.getAllPoll = function(req,res){
  poll.find(function(err,polls){
    if(!err){
      res.json(polls);
    }else{
      res.json(err);
    }
  })
}

exports.cleanAll = function(req,res){
  poll.remove(function(){
    console.log("Remove all");
  });
  vote.remove(function(){
    res.send("remove all vote");
  })

}


exports.information = function(req,res){
  var user = req.session;
  console.log(req.isAuthenticated());
  res.send(user.username);
}

exports.castVote = function(req,res,next){
  var entry = req.body;
  var ID = entry.choiceID;
  if(req.isAuthenticated())
   {

    var user = req.session.passport.user.username;
  //console.log(user);
  //var user = entry.user;
  poll.findOne({"choice._id":ID},function(err,polls){
    console.log("__________________found_____________________"+user);
    console.log(polls);
    if(!err){
      //checking uniquness
      var unique = true;
      polls["user"].forEach(function(UserDB){
        if(UserDB===user){
          unique = false;
        };
      })

      polls.user.push(user);
      polls["choice"].forEach(function(value,index){
        if(value["_id"]==ID){
          polls.choice[index].vote+= 1;
        }
      })


      console.log(unique);
      if(unique){
        polls.save(function(err,p){
         res.redirect('/')
       });
     }

  }else{
    res.send("poll does not exist");
  }
  })
}else{
  res.redirect('/api/info');
}
}
