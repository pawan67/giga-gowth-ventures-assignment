const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const dotenv = require("dotenv");
const passport = require("passport");
const session = require("express-session");
require("./passport");
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(passport.initialize());
app.use(
  session({
    secret: "this-is-a-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.session());
connectDB();
const PORT = process.env.PORT || 5050;

app.get("/auth/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

app.get("/auth/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND_URL);
  });
});


app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL);
  }
);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
