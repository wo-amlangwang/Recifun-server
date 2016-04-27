var followcontrol = require('./followcontrol');

module.exports = {
    follow : function (req,res,next) {
        followcontrol.follow(req).then(function(follow) {
            res.status(200).send({follow : follow});
        }).catch(function(err) {
            if(err == 3){
                return res.sendStatus(403);
            }
            res.sendStatus(500);
        });
    },
    remove : function (req,res,next) {
        followcontrol.remove(req).then(function () {
            res.sendStatus(200);
        }).catch(function (err) {
            if(err == 3) {
                return res.sendStatus(403);
            }
            res.sendStatus(500);
        });
    },
    getFollowing : function (req,res,next) {
        followcontrol.getFollowing(req).then(function(follows) {
            res.status(200).send({ 'follows' : follows});
        }).catch(function (err) {
            res.sendStatus(500);
        });
    },
    getFollower : function (req,res,next) {
        followcontrol.getFollower(req).then(function(follows) {
            res.status(200).send({ 'follows' : follows});
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    },
    getOne : function (req,res,next) {
        followcontrol.getOne(req).then(function(follow) {
            res.status(200).send({ 'follow' : follow});
        }).catch(function (err) {
            console.log(err);
            res.sendStatus(500);
        });
    }
};
