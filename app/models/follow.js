var mongoose = require('mongoose');
var uuid = require('node-uuid');

var followSchema = mongoose.Schema({
  user        : mongoose.Schema.Types.ObjectId,
  userprofile    : {type : mongoose.Schema.Types.ObjectId, ref : 'profile'},
  followprofile : {type : mongoose.Schema.Types.ObjectId, ref : 'profile'},
  lastmodfide       : {type : Date, default : new Date()},
});

module.exports = mongoose.model('Follow', followSchema);
