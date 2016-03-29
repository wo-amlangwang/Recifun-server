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
          console.log(profile);
          return resolve(profile);
        }
      });
    });
  },
  update : function (req) {
    return new Promise(function(resolve, reject) {
      if(req.user === undefined){
        return reject(3);
      }
      console.log(req.body.profile);
      Profile.findOne({user : req.user._id},function (err,profile) {
        if(err){
          return reject(err);
        }
        profile.nickname = req.body.profile.nickname || profile.nickname;
        profile.email    = req.body.profile.email || profile.email;
        profile.save(function (err,profile) {
          if(err){
            return reject(err);
          }
          return resolve(profile);
        });
      });
    });
  }
};
