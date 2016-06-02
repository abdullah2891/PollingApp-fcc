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
      var array = [];
      var voteArray =[];
      var q_array =[];
      var poll_array = [];
      polls.forEach(function(poll){
        array=[];q_array=[];
        poll["choice"].forEach(function(options){
          array.push(options.vote);
          q_array.push(options.option);
        })
        console.log(poll["question"]);
        console.log(array);
        voteArray.push({"question":poll.question,"votes":array});
        poll.voteArray.push(array);
        poll.optionArray.push(q_array);
        poll_array.push(q_array);

      })
      console.log(voteArray);
      console.log(poll_array);

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


exports.loggedIn = function(req,res){
  var user = req.session;
  res.send(user);
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

    if(!err){
      //checking uniquness
      var unique = true;
      polls["user"].forEach(function(UserDB){
        if(UserDB===user){
          unique = false;
        };
      })

      console.log(polls.choice);
      polls.user.push(user);
      polls["choice"].forEach(function(value,index){
        if(value["_id"]==ID){
          polls.choice[index].vote+= 1;
        }
      })


      console.log(unique);
      if(unique){

        polls.save(function(err,p){
          if(!err){
            res.redirect('/')
          }
       });
     }else{
       console.log("already voted");
       res.send(401,"User already voted");
     }

  }else{
    res.send(400,"poll does not exist");
  }
  })
}else{
  console.log("Not findig cookie");
  res.send(400,"user not authenticated");
}
}
