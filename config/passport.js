const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Load User model
const USERS = require("../models").user;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        // Check if it is registered user.
        const user = await USERS.findOne({ where: { email } });
        if (!user) {
          return done(null, false, { message: "Incorrect Email." });
        }

        // Check if password is correct
        if (!user.validatePassword(password)) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser(({ id }, done) => done(null, id));

passport.deserializeUser(async (id, done) => {
  try {
    const dbUser = await USERS.findByPk(id);
    return done(null, dbUser);
  } catch (error) {
    return done(error);
  }
});

module.exports = passport;
