require("dotenv").config();
require("./passport");
const cors = require("cors");
const connectDB = require("./configs/db.config");
const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(cors());

const isLoggedIn = require("./middlewares/auth.middleware");

app.get("/", isLoggedIn, (req, res) => {
  res.send(`Hello world ${req.user.displayName}`);
});
app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.use(
  cookieSession({
    name: "twitter-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.get("/", (req, res) => {
  res.send(`Hello world ${req.user}`);
});
app.get("/auth/error", (req, res) => res.send("Unknown Error"));
app.get("/auth/twitter", passport.authenticate("twitter"));
app.get(
  "/auth/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(process.env.PORT || 3000, (err) => {
  if (err) console.error(err);
  console.log("Server is running on port ", process.env.PORT || 3000);
  connectDB();
});

// passport.use(
//   new TwitchStrategy(
//     {
//       clientID: "YOUR_TWITCH_CLIENT_ID",
//       clientSecret: "YOUR_TWITCH_CLIENT_SECRET",
//       callbackURL: "http://localhost:3000/auth/twitch/callback",
//       scope: "user:read:email", // Optional scopes
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // Handle Twitch authentication callback
//       // Implement user registration or login logic here
//     }
//   )
// );

// app.get("/auth/twitter", passport.authenticate("twitter"));
// app.get("/auth/twitter/callback", (req, res, next) => {
//   passport.authenticate("twitter", (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ message: "Authentication failed" });
//     }
//     if (!user) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//     return res.status(200).json({ message: "Authentication successful" });
//   })(req, res, next);
// });

// app.get("/auth/twitch", passport.authenticate("twitch"));
// app.get("/auth/twitch/callback", (req, res, next) => {
//   passport.authenticate("twitch", (err, user, info) => {
//     if (err) {
//       return res.status(500).json({ message: "Authentication failed" });
//     }
//     if (!user) {
//       return res.status(401).json({ message: "Authentication failed" });
//     }
//     return res.status(200).json({ message: "Authentication successful" });
//   })(req, res, next);
// });
