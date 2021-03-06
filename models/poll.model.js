var mongoose = require('mongoose');

module.exports = mongoose.model('poll',{
  question:{type:String,unique:true,required:true},
  choice : [{option:String,vote:Number}],
  voteArray:[],
  optionArray:[],
  user: [String],
  owner: String
})
