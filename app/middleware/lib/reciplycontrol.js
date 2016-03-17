var Reciply = require('../../models/reciply');

var Promise = require("bluebird");

module.exports = {
  update : function(req) {
    return new Promise(function(resolve, reject) {
      req.body.reciply.save(function(err,reciply){
        if(err){
          reject(err);
        }else {
          resolve(reciply);
        }
      });
    });
  },
  create : function(req) {
    reci = new Reciply();
    reci.author = req.user._id;
    reci.picture = req.body.picture || '';
    reci.name = req.body.name || '';
    reci.description = req.body.description || '';
    if(req.body.steps !== undefined){
      reci.steps = req.body.steps;
      reci.numsteps = req.body.steps.length;
    }
    return new Promise(function(resolve, reject) {
        reci.save(function(err,newreci) {
          if(err){
            reject(err);
          }else {
            resolve(newreci);
          }
        });
    });
  },
  gatall : function() {
    return new Promise(function(resolve, reject) {
      Reciply.find({})
      .sort({lastmodfide : -1})
      .populate('author')
      .exec(function(err,reciplys) {
        if(err){
          reject(err);
        }else {
          resolve(reciplys);
        }
      });
    });
  },
  getOne : function (req) {
    return new Promise(function(resolve, reject) {
      Reciply.findOne({_id : req.body._id || req.params._id})
      .populate('author')
      .exec(function(err, reciply) {
        if(err){
          reject(err);
        }else {
          resolve(reciply);
        }
      });
    });
  }
};
