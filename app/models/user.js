var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var findorcreate  = require('mongoose-findorcreate');
var uuid = require('node-uuid');

var userSchema = mongoose.Schema({
  userid : { type: String, default: uuid.v1() },
  local :{
    username : String,
    password : String,
  },
  facebook :{
    id    : String,
    email : String,
    name  : String
  }
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

userSchema.plugin(findorcreate);

module.exports = mongoose.model('User', userSchema);
