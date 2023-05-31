const cookieSession = require("cookie-session");
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
// const passportSetup = require("./config/passport-setup");
// const session = require("express-session");
const authRoutes = require("./routes/auth-routes");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");
const cookieParser = require("cookie-parser");

mongoose
  .connect(keys.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.use(
  cookieSession({
    name: "session",
    keys: [keys.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use("/auth", authRoutes);

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};

// if it's already login, send the profile response,
// otherwise, send a 401 response that the user is not authenticated
// authCheck before navigating to home page
app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

// connect react to nodejs express server
app.listen(port, () => console.log(`Server is running on port ${port}!`));
