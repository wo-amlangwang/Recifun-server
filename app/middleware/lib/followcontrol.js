var Follow = require('../../models/follow');
var Profile = require('../../models/profile');
var Promise = require("bluebird");

module.exports = {
    follow : function(req) {
        foll = new Follow();
        foll.user = req.user._id;
        foll.userprofile = req.body.userprofile;
        foll.followprofile = req.body.followprofile;
        foll.lastmodfide = new Date();
        return new Promise(function(resolve, reject) {
            if(req.user === undefined){
              return reject(3);
            }
            foll.save(function(err,newfoll) {
                if(err){
                    reject(err);
                }else {
                    resolve(newfoll);
                    console.log("follow success");
                }
            });
            Profile.findOne({user : req.user._id},function (err,profile) {
                if(err){
                    return reject(err);
                }
                profile.following += 1;
                profile.save(function (err,profile) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(profile);
                });
            });
            Profile.findOne({user : req.body.followprofile.user},function (err,profile) {

                if(err){
                    return reject(err);
                }
                profile.follower += 1;
                profile.save(function (err,profile) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(profile);
                });
            });
        });
    },
    remove : function(req) {
        return new Promise(function(resolve, reject) {
            if(req.user === undefined){
              return reject(3);
            }
            Follow.findOne({user : req.user._id, followprofile : req.body.followprofile}, function (err, follow) {
                if(err){
                    return reject(err);
                }
                else {
                    follow.remove(function(err) {
                        if(err){
                            reject(err);
                        } else {
                            resolve();
                            console.log("unfollow success");
                        }
                    });
                }
            });
            Profile.findOne({user : req.user._id},function (err,profile) {
                if(err){
                    return reject(err);
                }
                profile.following -= 1;
                profile.save(function (err,profile) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(profile);
                });
            });
            Profile.findOne({user : req.body.followprofile.user},function (err,profile) {
                if(err){
                    return reject(err);
                }
                profile.follower -= 1;
                profile.save(function (err,profile) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(profile);
                });
            });
        });
    },
    getFollowing : function(req) {
        return new Promise(function(resolve, reject) {
            if(req.user === undefined){
              return reject(3);
            }
            Follow.find({user : req.user})
            .populate('userprofile')
            .exec(function(err, follows) {
                if(err){
                    reject(err);
                }else {
                    resolve(follows);
                    console.log("find following success : " + follows.length);
                }
            });
        });
    },
    getFollower : function(req) {
        return new Promise(function(resolve, reject) {
            if(req.user === undefined){
              return reject(3);
            }
            Follow.find({followprofile : req.user})
            .exec(function(err, follows) {
                if(err){
                    reject(err);
                }else {
                    resolve(follows);
                    console.log("find follower success : " + follows.length);
                }
            });
        });
    },
    getOne : function(req) {
        return new Promise(function(resolve, reject) {
            if(req.user === undefined){
              return reject(3);
            }
            Follow.find({user : req.user._id, followprofile : req.body.followprofile._id})
            .exec(function(err, follow) {
                if(err){
                    reject(err);
                }else {
                    resolve(follow);
                    console.log("find following success : " + follow.length);
                }
            });
        });
    }
};
