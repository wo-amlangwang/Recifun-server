var mongoose = require('mongoose');
var uuid = require('node-uuid');

var favoriteSchema = mongoose.Schema({
  user        : mongoose.Schema.Types.ObjectId,
  recipe      : {type : mongoose.Schema.Types.ObjectId, ref : 'Reciply'},
  lastmodfide : {type : Date, default : new Date()},
});

module.exports = mongoose.model('Favorite', favoriteSchema);
