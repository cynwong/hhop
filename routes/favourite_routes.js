// for /api/favourite routes
const router = require("express").Router();

const { checkAuthenticated } = require("../config/auth");
const { ViewMyFavourites } = require("../config/page_settings");

// get the models
const models = require("../models");

const Favourites = models.favourite;
const Recipe = models.recipe;

// --- GET Routes ---
router.get("/", checkAuthenticated, async (req, res) => {
  // get current user id
  const { user } = req;
  const userId = user.id;

  // get user's favourite records
  const favs = await Favourites.findAll({
    where: {
      userId,
    },
    include: {
      model: Recipe,
      require: true,
      include: {
        model: Favourites,
      },
    },
  });

  // get recipes data for rendition
  const recipes = favs.map(({ dataValues }) => {
    const {
      id,
      title,
      photo,
      favourites,
    } = dataValues.recipe;
    const recipe = {
      id,
      title,
      photo,
    };
    recipe.favCount = favourites.length;
    return recipe;
  });

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
