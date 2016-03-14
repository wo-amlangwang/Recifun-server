var mongoose = require('mongoose');
var uuid = require('node-uuid');

var reciSchema = mongoose.Schema({
  id      : { type: String, default: uuid.v1() },
  author  : String,
  name    : String,
  picture : String,
  numStep : Number,
  steps   : [{
    stepnum     : Number,
    description : String,
    picture     : String
  }]
});

module.exports = mongoose.model('Reci', reciSchema);
