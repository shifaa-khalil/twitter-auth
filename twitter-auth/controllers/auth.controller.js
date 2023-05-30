const TwitterStrategy = require("passport-twitter").Strategy;
const User = require("../models/user.model");

exports.authenticateWithTwitter = (passport) => {
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        // callbackURL: "http://localhost:3000/auth/twitter/callback",
      },
      (profile, done) => {
        const { id, displayName } = profile;
        User.findOne({ twitterId: id }, (err, user) => {
          if (err) {
            return done(err);
          }

          if (user) {
            user.name = displayName;

            user.save((err) => {
              if (err) {
                return done(err);
              }
              return done(null, user);
            });
          } else {
            const newUser = new User({
              twitterId: id,
              name: displayName,
            });

            newUser.save((err) => {
              if (err) {
                return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      }
    )
  );
};
