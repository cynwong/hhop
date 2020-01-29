const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

// Load User model
const User = require("../models").user;

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "Email is not registered." });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { message: "Incorrect Password" });
        });
        return null;
      }),
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => User.findByPK(id, (err, user) => done(err, user)));
};
