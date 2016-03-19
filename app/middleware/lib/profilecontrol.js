var Profile = require('../../models/profile');
var Promise = require("bluebird");
module.exports = {
  get : function (req) {
    return new Promise(function(resolve, reject) {
      if(req.user === undefined){
        return reject(3);
      }
      Profile.findOne({user : req.user._id},function (err,profile) {
        if(err){
          return reject(err);
        }else {
          return resolve(profile);
        }
      });
    });
  }
};
