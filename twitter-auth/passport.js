const passport = require("passport");
const TwitterStrategy = require("passport-twitter").Strategy;
passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
      callbackURL: "http://www.localhost:3000/auth/twitter/callback",
      authorizationURL: "https://api.twitter.com/oauth/authenticate",
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
