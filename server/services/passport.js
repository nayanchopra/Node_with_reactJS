const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose');
const UserCollection = mongoose.model('users');

passport.serializeUser((user,done) => {
  done(null,user.id);
});

passport.deserializeUser((id,done) => {
  UserCollection.findById(id).then(user => {
    done(null,user);
  })
})

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GoogleClientID,
        clientSecret: keys.GoogleClientSecret,
        callbackURL: "/auth/google/callback",
        proxy: true
      },
      (accessToken, refreshToken, profile, done) => {
        UserCollection.findOne({googleId : profile.id}).then((existingUser)=>{
          if(existingUser) {
            //If user exists
            done(null,existingUser);
          }else{
            //If does not exits
              new UserCollection( {
                googleId : profile.id,
                firstName : profile.name.givenName,
                familyName : profile.name.familyName
            })
            .save()
            .then(user => done(null,user));

          }
        })
        
      }
    )
  );