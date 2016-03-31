var mongoose = require('mongoose');
var uuid = require('node-uuid');

var reciplySchema = mongoose.Schema({
  picture     : String,
  video       : String,
  publish     : {type : Date, default : new Date()},
  lastmodfide : {type : Date, default : new Date()},
  name        : String,
  author      : mongoose.Schema.Types.ObjectId,
  userprofile : {type : mongoose.Schema.Types.ObjectId, ref : 'Profile'},
  description : String,
  numsteps    : Number,
  steps       : [{
    stepNum : Number,
    detail  : String,
    picture : String,
  }],
  ingredients : [{
    name      : String,
    quantity  : String
  }],
});

module.exports = mongoose.model('Reciply', reciplySchema);
