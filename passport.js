const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
require("dotenv").config();
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("./models/User");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      if (profile?.id) {
        User.findOne({ userId: profile.id }).then((existingUser) => {
          if (existingUser) {
            cb(null, existingUser);
          } else {
            new User({
              userId: profile.id,
              username: profile.displayName,
              email: profile.emails[0]?.value,
            })
              .save()
              .then(user => cb(null, user));
          }
        });
      }
      console.log(profile);
      return cb(null, profile)
    }
  )
);

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'email', 'displayName']
},  
function(accessToken, refreshToken, profile, cb) {
  if (profile?.id) {
    User.findOne({ userId: profile.id }).then((existingUser) => {
      if (existingUser) {
        cb(null, existingUser);
      } else {
        new User({
          userId: profile.id,
          username: profile.displayName,
          email: profile.emails[0]?.value,
        })
          .save()
          .then(user => cb(null, user));
      }
    });
  }
  console.log(profile);
  return cb(null, profile)
}
));








