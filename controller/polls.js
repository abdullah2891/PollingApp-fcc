var poll = require('../models/poll.model');
var vote = require("../models/vote");


exports.createPoll = function(req,res){
  var newPoll = new poll();
  var entry = req.body;

  newPoll.question = entry.question;

  entry["choice"].forEach(function(choice){
    newPoll.choice.push({option:choice,vote:0});
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

exports.castVote = function(req,res){
  var entry = req.body;
  var ID = entry.choiceID;
  var user = entry.user;
  poll.findOne({"choice._id":ID},function(err,polls){
    console.log(polls);
    if(!err){
      polls.user.push(user);
      polls["choice"].forEach(function(value,index){
        if(value["_id"]==ID){
          console.log(value);
          polls.choice[index].vote+= 1;
        }
      })
      polls.save(function(err,p){ res.json(p)});

  }else{
    res.send("poll does not exist");
  }
  })

}

exports.countVote = function(req,res){

}
