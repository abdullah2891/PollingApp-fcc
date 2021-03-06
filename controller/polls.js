var poll = require('../models/poll.model');
var vote = require("../models/vote");
var passport = require('passport');


exports.createPoll = function(req,res){
  var newPoll = new poll();
  var entry = req.body;
  newPoll.question = entry.question;
  newPoll.owner = req.user.user.screen_name;

  newPoll.save(function(err,poll){
    if(!err){
      poll.choice = entry["choice"].map(c =>{
        return{
          option: c,
          vote: 0.1
        }
      })

      poll.save(function(err, p){
        if(!err){
          res.json(p);
        }else{
          res.json(500,err)
        }
      });
    }else{
      res.send(400,err);
    }
  })

}


exports.test = function(req, res){
    res.send('authenticate');
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
        voteArray.push({"question":poll.question,"votes":array});
        poll.voteArray.push(array);
        poll.optionArray.push(q_array);
        poll_array.push(q_array);

      })

      res.json({polls});
    }else{
      res.send(400,"error making new poll");
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
  const user = req.user;

  if(Object.keys(user || {}).length > 0){
    res.json(200, {profile: user});
  }else{
    res.json(500, {error: "failed to fetch profile"});
  }
}

exports.castVote = function(req,res,next){
  var entry = req.body;
  console.log(entry)
  var ID = entry.choiceID;

  var user = req.user.user.screen_name;
  console.log(req.user)
  //console.log(user);
  poll.findOne({"choice._id":ID},function(err, polls){
    if(polls){
      //checking uniquness
      var unique = true;
      polls["user"].forEach(function(UserDB){
        if(UserDB===user){
          unique = false;
        };
      })

      polls.user = polls.user.concat([user]);
      polls["choice"].forEach(function(value,index){
        if(value["_id"]===ID){
          polls.choice[index].vote+= 1;
        }
      })


      if(unique){

        polls.save(function(err,p){
          if(!err){
            res.status(200).send({status: "Voted!"});
          }else{
            res.json(500 ,{error: err})
          }
       });
     }else{
       res.send(401,"You already voted");
     }

  }else{
    res.json(400,{status:"poll doesn't exist"});
  }
  })
}


exports.deletePoll = function(req, res){
  const record_id = req.query.id;
  
  if(record_id){
    poll.deleteOne({_id: record_id}, function(err, deletedPoll){
      if(err){
        res.json(500 ,err);
      }else{
        res.json(200 , {status:  deletedPoll});
      }
    });
  }else{
    res.json({
      status: "Record id missing"
    });
  }

}
