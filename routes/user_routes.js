// for /api/users routes

const router = require("express").Router();

// please uncomment this
const users = require("../models").user;

// --- GET Routes ---
router.get("/api/login", (req, res) => {
  users.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  }).then((dbusers) => {
    if (dbusers.length === 0) {
      // send status 400
      res.json(false);
    } else {
      res.json(true);
    }
  });
});


router.post("/api/signup", (req, res) => {
  users.findOne({
    where: {
      email: req.body.email,
    },
  }).then((dbusers) => {
    if (dbusers.length === 0) {
      res.json(true);
    } else {
      // send status 400
      res.json(false);
    }
  });
  users.create({
    username: req.body.nameInput,
    email: req.body.email,
    password: req.body.password,
  }).then((dbusers) => {
    res.json(dbusers);
  });
});

// --- POST ---
// router.post("<<Route>>", (req, res) => {

// });


// --- PUT ---
// router.put("<<ROUTE>>", (req, res) => {
// });

// --- DELETE ---
// router.delete("/:id", (req, res) => {
// });

module.exports = router;
