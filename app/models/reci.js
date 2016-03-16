var mongoose = require('mongoose');
var uuid = require('node-uuid');

var reciSchema = mongoose.Schema({
  id      : { type: String, default: uuid.v1() },
  author  : { type: String, ref: 'User' },
  name    : String,
  picture : String,
  numStep : Number,
  data    : Date,
  steps   : [{
    stepnum     : Number,
    description : String,
    picture     : String
  }]
});

module.exports = mongoose.model('Reci', reciSchema);
