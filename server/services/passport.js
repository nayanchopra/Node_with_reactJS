const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require('mongoose');
const UserCollection = mongoose.model('users');

passport.use(
    new GoogleStrategy(
      {
        clientID: keys.GoogleClientID,
        clientSecret: keys.GoogleClientSecret,
        callbackURL: "/auth/google/callback",
      },
      (accessToken, refreshToken, profile, done) => {
          console.log(profile);
        new UserCollection( {
            googleId : profile.id,
            firstName : profile.name.givenName,
            familyName : profile.name.familyName
        }).save();
      }
    )
  );