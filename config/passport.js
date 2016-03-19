var LocalStrategy = require('passport-local').Strategy;

var User = require('../app/models/user');
var Profile = require('../app/models/profile');
var FacebookTokenStrategy = require('passport-facebook-token');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
        done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
  });

  passport.use('local-login', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
  },function(username,password,done) {
    User.findOne({'local.username' : username},function(err,user) {
      if(err){
        return done(err,false,{'message' : 'database error',
                               'errorcode' : 503});
      }
      if(!user){
        return done(null,false,{'message' : 'wrong username or email',
                               'errorcode' : 401});
      }
      if (!user.validPassword(password)) {
        return done(null,false,{'message' : 'wrong username or email',
                               'errorcode' : 401});
      }
      Profile.findOne({ user : user._id},function (err,profile) {
        if(err){
          throw err;
        }
        return done(null,user,profile);

      });

    });
  }));

  passport.use('local-register', new LocalStrategy({
    usernameField : 'username',
    passwordField : 'password',
  },function (username,password,done) {
    User.findOne({'local.username' : username},function (err,user) {
      if(err) {
        return done(err,false,{'message' : 'database error',
                               'errorcode' : 503});
      }
      if(user) {
        return done(null, false,{'message' : 'user exist',
                                  'errorcode' : 409});
      }else {
        var newUser = new User();
        newUser.local.username = username;
        newUser.local.password = newUser.generateHash(password);
        newUser.save(function(err,thisuser) {
          if(err) {
            throw err;
          }
          userprofile = new Profile();
          userprofile.user = thisuser._id;
          userprofile.save(function (err, newprofile) {
            if(err){
              throw err;
            }
            thisuser.profile = newprofile._id;
            thisuser.save(function (err,user) {
              if(err){
                throw err;
              }
              return done(null,user,newprofile);
            });
          });
        });
      }
    });
  }));

  passport.use(new FacebookTokenStrategy({
    clientID: process.env.FBAPPID,
    clientSecret: process.env.FBAPPSECRET
  },function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({'facebook.id' : profile.id},function (err,newUser,create) {
      if(String(process.env.DEBUG).localeCompare('true') === 0){
        console.log(profile);
      }
      //newUser.facebook.email = profile.emails[0].value;
      //newUser.facebook.name = profile.name.familyName + ' ' + profile.name.givenName;
      if(create){
        var newprofile = new Profile();
        newprofile.email = profile.emails[0].value;
        newprofile.picture = profile.photos[0].value;
        newprofile.user = newUser._id;
        newprofile.save(function (err, thisprofile) {
          newUser.profile = thisprofile._id;
          newUser.save(function (err,thisuser) {
            if(err){
              throw err;
            }
            return done(err,thisuser);
          });
        });
      }
      return done(err,newUser);
    });
  }));
};
