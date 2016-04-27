var Favorite = require('../../models/favorite');
var Reciply = require('../../models/reciply');

var Promise = require("bluebird");
module.exports = {
    create : function(req) {
        favo = new Favorite();
        favo.user = req.user._id;
        favo.recipe = req.body.recipe;
        favo.lastmodfide = new Date();
        return new Promise(function(resolve, reject) {
            favo.save(function(err,newfavo) {
                if(err){
                    reject(err);
                }else {
                    resolve(newfavo);
                    console.log("like success");
                }
            });
            Reciply.findOne({_id : req.body.recipe},function (err,reciply) {
                if(err){
                    return reject(err);
                }
                reciply.liked += 1;
                reciply.save(function (err,reciply) {
                    if(err){
                        console.log(err);
                        return reject(err);
                    }
                    return resolve(reciply);
                });
            });
        });
    },
    remove : function(req) {
        return new Promise(function(resolve, reject) {
            Favorite.findOne({user : req.user._id, recipe : req.body.recipe}, function (err, favorite) {
                if(err){
                    return reject(err);
                }
                else {
                    favorite.remove(function(err) {
                        if(err){
                            reject(err);
                        } else {
                            resolve();
                            console.log("unlike success");
                        }
                    });
                }
            });
            Reciply.findOne({_id : req.body.recipe},function (err,reciply) {
                if(err){
                    return reject(err);
                }
                reciply.liked -= 1;
                reciply.save(function (err,reciply) {
                    if(err){
                        return reject(err);
                    }
                    return resolve(reciply);
                });
            });
        });
    },
    liked : function(req) {
        return new Promise(function(resolve, reject) {
            Favorite.findOne({user : req.user._id, recipe : req.body.recipe})
            .exec(function(err, favorite) {
                console.log("Matched favorite : " + favorite);
                if(err){
                    reject(err);
                }else {
                    resolve(favorite);
                    console.log("find relation success");
                }
            });
        });
    },
    getFavorites : function(req) {
        return new Promise(function(resolve, reject) {
            Favorite.find({user : req.user._id})
            .populate('recipe')
            .populate('steps')
            .populate('ingredients')
            .exec(function(err, favorites) {
                if(err){
                    reject(err);
                }else {
                    resolve(favorites);
                    console.log("find favorites success : " + favorites.length);
                }
            });
        });
    },
};
