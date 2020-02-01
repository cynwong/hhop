const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Load User model
const User = require("../models").user;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Check if it is registered user.
        const user = await User.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect Email." });
        }
        // Check if password is correct
        if (!user.validPassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser(({ id }, done) => done(null, { id }));

passport.deserializeUser(async (user, done) => {
  try {
    const dbUser = await User.findByPk(user.id);
    return done(null, dbUser);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
