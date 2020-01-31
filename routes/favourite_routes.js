// for /api/favourite routes
const router = require("express").Router();

const models = require("../models");

const Favourites = models.favourite;
const Recipe = models.recipe;

// --- GET Routes ---
router.get("/", async (req, res) => {
  const favs = await Favourites.findAll({
    where: {
      userId: 1,
    },
    include: {
      model: Recipe,
      require: true,
    },
  });
  const recipes = favs.map(({ dataValues }) => ({
    userId: dataValues.userId,
    recipeId: dataValues.recipeId,
    recipe: dataValues.recipe.dataValues,
  }));
  res.render("view_favourites", {
    title: "Recipe Lover!: View favourites",
    recipes,
    isMain: true,
    isSearch: true,
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
