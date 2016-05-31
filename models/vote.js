var mongoose = require('mongoose');


module.exports = mongoose.model("Vote",{
  question : String,
  vote : String ,
  voteID:String,
  user : { type: String , unique:true}
})
