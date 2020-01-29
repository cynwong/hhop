// for /users routes

const router = require("express").Router();

const Users = require("../models").user;

// --- GET Routes ---

// route "/user" : User dashboard page.
router.get("/", (_, res) => res.render("user", {
  title: "Recipe Lovers!: User dashboard",
  isMain: true,
}));

// route "/user/register" : User Registration page.
router.get("/register", (_, res) => res.render("signup", {
  title: "Recipe Lovers!: Register new user",
  isLogin: true,
}));

// route "/user/login" : User log-in page
router.get("/login", (_, res) => res.render("login", {
  title: "Recipe Lovers!: User login",
  isLogin: true,
}));


// --- POST ---
router.post("/login", (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((user) => {
    if (user.length === 0) {
      // send status 400
      res.json(false);
    } else {
      res.json(true);
    }
  });
});
router.post("/api/signup", (req, res) => {
  Users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user.length === 0) {
      res.json(true);
    } else {
      // send status 400
      res.json(false);
    }
  });
  Users.create({
    username: req.body.nameInput,
    email: req.body.email,
    password: req.body.password,
  }).then((user) => {
    res.json(user);
  });
});

// --- PUT ---
// router.put("<<ROUTE>>", (req, res) => {
// });

// --- DELETE ---
// router.delete("/:id", (req, res) => {
// });

module.exports = router;
