var mongoose = require('mongoose');
var uuid = require('node-uuid');

var commentSchema = mongoose.Schema({
    commPicture : String,
    commName    : String,
    commUser    : String,
    recipe      : {type : mongoose.Schema.Types.ObjectId, ref : 'Reciply'},
    contents    : String,
    lastmodfide : {type : Date, default : new Date()},
});

module.exports = mongoose.model('Comment', commentSchema);
