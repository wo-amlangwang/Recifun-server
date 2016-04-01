var Reciply = require('../../models/reciply');

var Promise = require("bluebird");
var uuid = require("node-uuid");
var HashTable = require('hashtable');
var hashtable = new HashTable();

module.exports = {
    update : function(req) {
        if(hashtable.has(req.body.reciply._id)){
            if(hashtable.get(req.body.reciply._id).lock){
                return reject(4);
            }
        }
        hashtable.put(req.body.reciply._id, {lock: true});
        return new Promise(function(resolve, reject) {
            Reciply.findOne({'_id' : req.body.reciply._id},function(err,reciply) {
                if(err){
                    hashtable.put(req.body.reciply._id, {lock: false});
                    return reject(err);
                }
                if(req.user._id.localeCompare(reciply.author) !== 0){
                    hashtable.put(req.body.reciply._id, {lock: false});
                    return reject(3);
                } else {
                    req.body.reciply.publish = reciply.publish;
                    req.body.reciply.lastmodfide = new Date();
                    req.body.reciply.save(function(err,reciply){
                        if(err){
                            hashtable.put(req.body.reciply._id, {lock: false});
                            reject(err);
                        } else {
                            hashtable.put(req.body.reciply._id, {lock: false});
                            resolve(reciply);
                        }
                    });
                }
            });
        });
    },
    create : function(req) {
        reci = new Reciply();
        reci.author = req.user._id;
        reci.userprofile = req.user.profile;
        reci.picture = req.body.picture || '';
        reci.video = req.body.video || '';
        reci.name = req.body.name || '';
        reci.publish = new Date();
        reci.lastmodfide = new Date();
        reci.description = req.body.description || '';
        reci.ingredients = req.body.ingredients || [];
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
    getall : function() {
        return new Promise(function(resolve, reject) {
            Reciply.find({})
            // sort by last modified
            .sort({lastmodfied : -1})
            .populate('userprofile')
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
            .populate('userprofile')
            .exec(function(err, reciply) {
                console.log("getOne reciply: " + reciply);
                if(err){
                    reject(err);
                }else {
                    resolve(reciply);
                }
            });
        });
    },
    remove : function(req) {
        return new Promise(function(resolve, reject) {
            Reciply.findOne({_id : req.body._id || req.params._id},function (err, reciply) {
                if(err){
                    return reject(err);
                }
                if(req.user._id.localeCompare(reciply.author) !== 0){
                    return reject(3);
                } else {
                    reciply.remove(function(err) {
                        if(err){
                            reject(err);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    },
    searchAll : function(req) {
        return new Promise(function(resolve, reject) {
            Reciply.find({name : new RegExp(req.body.searchkey, "i")})
            .populate('userprofile')
            .exec(function(err, reciplys) {
                console.log("Matched reciplys: " + reciplys);
                if(err){
                    reject(err);
                }else {
                    resolve(reciplys);
                }
            });
        });
    }
};
