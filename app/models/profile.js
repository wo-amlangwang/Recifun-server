var mongoose = require('mongoose');
var uuid = require('node-uuid');

var profileSchema = mongoose.Schema({
  user        : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  nickname    : {type : String, default: 'foodeater'},
  email       : {type : String, default: ''},
  following   : {type : Number, default: 0},
  follower    : {type : Number, default: 0},
  picture     : {type : String, default: 'https://s3-us-west-2.amazonaws.com/langwang1/uploads/photos/d1880ef0-e9b7-11e5-8a6d-93c8e299b24e.gif'},
});

module.exports = mongoose.model('Profile', profileSchema);
