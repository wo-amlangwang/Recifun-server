var mongoose = require('mongoose');
var uuid = require('node-uuid');

var reciplySchema = mongoose.Schema({
  _id         : {type : String, default: uuid.v1() },
  picture     : String,
  publish     : {type : Date, default : new Date()},
  lastmodfide : {type : Date, default : new Date()},
  name        : String,
  author      : {type : String, ref : 'User'},
  description : String,
  numsteps    : Number,
  steps       : [{
    stepNum : Number,
    detail  : String,
    picture : String,
  }],
});

module.exports = mongoose.model('Reciply', reciplySchema);
