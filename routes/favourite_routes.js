// for /api/favourite routes
const router = require("express").Router();

const { getAllFavBrief } = require("../config/db_functions");

const { checkAuthenticated } = require("../config/auth");
const { ViewMyFavourites } = require("../config/page_settings");

// --- GET Routes ---
router.get("/", checkAuthenticated, async (req, res) => {
  // get current user id
  const { user } = req;
  const userId = user.id;

  const recipes = await getAllFavBrief(userId);

  // construct view page.
  const pageSettings = {
    ...ViewMyFavourites,
    user,
    recipes,
  };
  res.render("view_favourites", pageSettings);
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
