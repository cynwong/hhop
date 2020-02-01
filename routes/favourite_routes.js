// for /favourite routes
const router = require("express").Router();

const { getAllFavBrief } = require("../config/db_functions");

const { checkAuthenticated } = require("../config/auth");
const { ViewMyFavourites } = require("../config/page_settings");


const Favourites = require("../models").favourite;

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
router.post("/", (req, res) => {
});

// --- DELETE ---
router.delete("/:id", async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  try {
    await Favourites.destroy({
      where: {
        recipeId,
        userId,
      },
    });
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: [
        { msg: "Unable to remove favourite" },
      ],
    });
  }
});

module.exports = router;
