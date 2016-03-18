var mongoose = require('mongoose');
var uuid = require('node-uuid');

var profileSchema = mongoose.Schema({
  user        : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
  nickname    : {type : String, default: 'foodeater'},
  email       : String,
  picture     : String,
});

module.exports = mongoose.model('Profile', profileSchema);
