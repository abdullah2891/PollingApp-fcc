var mongoose = require('mongoose');

module.exports = mongoose.model('poll',{
  question:{type:String,unique:true},
  choice : [{option:String,vote:Number}],
  user: [String]
})
