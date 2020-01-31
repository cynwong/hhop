// for /users routes
const passport = require("passport");

const router = require("express").Router();

const Users = require("../models").user;
const {
  DashboardPageSettings,
  LoginPageSettings,
  RegisterUserPageSettings,
} = require("../config/page_settings");

const { checkAuthenticated, forwardAuthenticated } = require("../config/auth");

// --- GET Routes ---

// route "/user" : User dashboard page.
router.get("/", checkAuthenticated, (_, res) => res.render("user", DashboardPageSettings));

// route "/user/register" : User Registration page.
router.get("/register", forwardAuthenticated, (_, res) => res.render("register_user", RegisterUserPageSettings));

// route "/user/login" : User log-in page
router.get("/login", forwardAuthenticated, (_, res) => res.render("login", LoginPageSettings));

// route:"/user/logout" : Logout
router.get("/logout", (req, res) => {
  req.logOut();
  req.flash("success_msg", "You are successfully logged out");
  res.redirect("/user/login");
});

// --- http Request - POST ---
// route "/user/login" : Login
// router.post("/login", (req, res, next) => {
//   passport.authenticate("local", {
//     successRedirect: "/user",
//     failureRedirect: "/user/login",
//     failureFlash: "Invalid username or password.",
//   })(req, res, next);
// });
// router.post("/login", passport.authenticate("local", (_, res) => {
//   // if success,
//   res.redirect("/user");
// }));
router.post("/login", passport.authenticate("local",
  {
    failureRedirect: "/user/login",
    failureFlash: true,
  }),
(req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.redirect("/user");
});

router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      name,
    } = req.body;
    // const errors = [];

    // data validation
    // if (!email) errors.push({ msg: "Email is required. " });
    // if (!password) errors.push({ msg: "Password is required. " });
    // if (!name) errors.push({ msg: "Name is required. " });

    // if (password.length < 8) {
    //   errors.push({ msg: "Password must be at least 8 characters long" });
    // }

    // const RenderRegisterWithErrors = () => res.render("register_user", {
    //   ...RegisterUserPageSettings,
    //   errors,
    //   name,
    //   email,
    //   password,
    // });

    // if (errors.length > 0) {
    //   // if there is errors
    //   return RenderRegisterWithErrors();
    // }

    // add new user
    const user = await Users.findOne({
      where: { email },
    });
    if (user) {
    //   errors.push({ msg: "Email is already registered." });
    //   return RenderRegisterWithErrors();
    // TODO: Discuss how we are going to do the error control. for this.
      return res.status(200).send(false);
    }
    const newUserInfo = {
      email,
      name,
      password,
    };

    // hash the password
    // newUserInfo.password = await bcrypt.hash(password, 10);
    await Users.create(newUserInfo);
    // return res.render("login", LoginPageSettings);
    return res.render("login", {
      ...LoginPageSettings,
      success_msg: "Successfully registered",
    }, (err, html) => {
      if (err) console.error(err);
      return res.send(html);
    });
  } catch (err) {
    console.error(err);
    // const errors = {msg: "Something went wrong during registration. Try again later"};
    // return res.status(500).render("user/register", {
    //   ...RegisterUserPageSettings,
    //   errors,
    // });
    return res.status(200).send(false);
  }
});

// --- PUT ---
// router.put("<<ROUTE>>", (req, res) => {
// });

// --- DELETE ---
// router.delete("/:id", (req, res) => {
// });

module.exports = router;
