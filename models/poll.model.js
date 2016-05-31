var mongoose = require('mongoose');

module.exports = mongoose.model('poll',{
  question:{type:String,unique:true},
  choice : [{option:String,vote:Number}],
  voteArray:[],
<<<<<<< HEAD
  optionArray:[],
=======
>>>>>>> a49cc87709acac3c6362cbae2852ea5a7893a9af
  user: [String]
})
