var Comment = require('../../models/comment');
var Promise = require("bluebird");
module.exports = {
    create : function(req) {
        comm = new Comment();
        comm.commPicture = req.body.commPicture;
        comm.commName = req.body.commName;
        comm.commUser = req.body.commUser;
        comm.recipe = req.body.recipe;
        comm.contents = req.body.contents;
        comm.lastmodfide = new Date();
        return new Promise(function(resolve, reject) {
            comm.save(function(err,newcomm) {
                if(err){
                    reject(err);
                }else {
                    resolve(newcomm);
                    console.log("comment success");
                }
            });
        });
    },
    remove : function(req) {
        return new Promise(function(resolve, reject) {
            Comment.findOne({_id : req.body._id}, function (err, comment) {
                if(err){
                    return reject(err);
                }
                else {
                    comment.remove(function(err) {
                        if(err){
                            reject(err);
                        } else {
                            resolve();
                            console.log("delete comment success");
                        }
                    });
                }
            });
        });
    },
    getComments : function(req) {
        return new Promise(function(resolve, reject) {
            Comment.find({recipe : req.body.recipe})
            .sort({lastmodfide : -1})
            // .populate('userprofile')
            .exec(function(err, comments) {
                if(err){
                    reject(err);
                }else {
                    resolve(comments);
                    console.log("find comments success");
                }
            });
        });
    },
};
