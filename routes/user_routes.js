// for /users routes
const passport = require("passport");
const bcrypt = require("bcrypt");

const router = require("express").Router();

// get db models.
const models = require("../models");

/**
 * @typeof db.model
 */
const USERS = models.user;
/**
 * @typeof db.model
 */
const FAVOURITES = models.favourite;
/**
 * @typeof db.model
 */
const RECIPES = models.recipe;

// get pge settings
const {
  ChangePasswordPageSettings,
  DashboardPageSettings,
  LoginPageSettings,
  RegisterUserPageSettings,
} = require("../config/page_settings");

const { checkAuthenticated, forwardAuthenticated } = require("../config/auth");

// --- GET Routes ---

// route "/user"
router.get("/", checkAuthenticated, async (req, res) => {
  const userId = req.user.id;
  const recordsLimit = 5;

  // get all user's favourites
  const favRecords = await FAVOURITES.findAll({
    where: { userId },
    include: {
      model: RECIPES,
      require: true,
      attributes: ["id", "title", "updatedAt"],
    },
    order: [
      [RECIPES, "updatedAt", "DESC"],
    ],
  });

  // get all user's recipes
  const recipeRecords = await RECIPES.findAll({
    where: {
      authorId: userId,
    },
    attributes: ["id", "title", "updatedAt"],
    order: [
      ["updatedAt", "DESC"],
    ],
  });
  const pageSettings = {
    ...DashboardPageSettings,
    username: req.user.name,
    recipesCount: recipeRecords.length,
    favsCount: favRecords.length,
    recipes: recipeRecords.slice(0, recordsLimit).map(({ dataValues }) => dataValues),
    favourites: favRecords.slice(0, recordsLimit).map(({ recipe }) => recipe.dataValues),
  };
  return res.render("user", pageSettings);
});

// route "/user/login" : User log-in page
router.route("/login")
  .get(forwardAuthenticated, (_, res) => res.render("login", LoginPageSettings))
  .post((req, res, next) => {
    // check if user has authorization
    passport.authenticate("local", (err, user) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          error: [{ msg: "Incorrect username or password" }],
        });
      }
      // log in User.
      req.logIn(user, (logInErr) => {
        if (logInErr) {
          console.error(logInErr);
          return next(logInErr);
        }
        return res.status(200).json({
          success_msg: "Login successful.",
        });
      });
      return null;
    })(req, res, next);
  });

// route:"/user/logout" : Logout
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/user/login");
});

// route "/user/password"
router.route("/password")
  .get(checkAuthenticated, (req, res) => {
    const pageSettings = {
      ...ChangePasswordPageSettings,
      username: req.user.name,
    };
    return res.render("change_password", pageSettings);
  })
  .post(async (req, res) => {
    const errors = [];
    const { id } = req.user;
    const { password, rePassword } = req.body;

    if (password.length < 8 || password.length > 16) {
      errors.push({ msg: "Password must be 8-16 characters long." });
    }

    if (password !== rePassword) {
      errors.push({ msg: "Two password must be identical." });
    }
    if (errors.length > 0) {
      return res.status(401).json({
        error: errors,
      });
    }
    try {
      const user = await USERS.findOne({
        where: { id },
      });

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        return res.json({
          error: [{ msg: "Cannot use the same password as current one." }],
        });
      }

      // fix BeforeUpdate not getting the data.
      // not require if that beforeUpdate is fixed.
      const saltRound = 10;
      const salt = await bcrypt.genSalt(saltRound);
      const newPassword = await bcrypt.hash(password, salt);

      // update the new password
      await USERS.update({ password: newPassword },
        {
          where: { id },
        });
      return res.status(200).json({
        success_msg: "Password is changed.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: [{ msg: "Something went wrong during update. Try again later." }],
      });
    }
  });

// route "/user/register" : User Registration page.
router.route("/register")
  .get(forwardAuthenticated, (_, res) => res.render("register_user", RegisterUserPageSettings))
  .post(async (req, res) => {
    try {
      const {
        email,
        password,
        name,
      } = req.body;
      const errors = [];

      // data validation
      if (!email) errors.push({ msg: "Email is required. " });
      if (!password) errors.push({ msg: "Password is required. " });
      if (!name) errors.push({ msg: "Name is required. " });

      if (password.length < 8) {
        errors.push({ msg: "Password must be at least 8 characters long" });
      }

      if (errors.length > 0) {
        // if there is errors, send it back to browser.
        return res.status(400).json({
          error: errors,
        });
      }

      // check if user already registered.
      const user = await USERS.findOne({
        where: { email },
      });
      if (user) {
        // if user, then notify the client.
        return res.status(400).json({
          error: [{ msg: "User already exists." }],
        });
      }

      // add new user to db
      await USERS.create({
        email,
        name,
        password,
      });
      // return success code back to browser
      return res.status(200).json({
        success_msg: "Successfully registered",
      });
    } catch (err) {
      console.log("err");
      console.error(err);
      return res.status(500).json({
        error: [{ msg: "Something went wrong. Try again later." }],
      });
    }
  });

module.exports = router;
