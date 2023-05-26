const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("./models/User");
const dotenv = require("dotenv");
dotenv.config();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if the user already exists in your database
        let user = await User.findOne({ googleId: profile.id });
        if (user) {
          return done(null, user);
        } else {
          // Create a new user in your database if they don't exist

          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            photo: profile.photos[0].value,
          });

          await user.save();
          return done(null, user);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
