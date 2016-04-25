var Favorite = require('../../models/favorite');
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
        });
    },
    liked : function(req) {
        return new Promise(function(resolve, reject) {
            Favorite.findOne({user : req.user._id, recipe : req.body.recipe})
            .exec(function(err, favorite) {
                console.log("Matched favorites, should be one: " + favorite);
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
            .exec(function(err, favorites) {
                console.log("Matched favorites : " + favorites);
                if(err){
                    reject(err);
                }else {
                    resolve(favorites);
                    console.log("find favorites success");
                }
            });
        });
    },
};
