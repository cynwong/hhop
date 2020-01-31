// for /api/search routes
const router = require("express").Router();
const models = require("../models");

const Recipe = models.recipe;

// --- GET Routes ---
router.get("api/search/:title", async (req, res) => {
  const result = await Recipe.findAll({
    where: {
      title: req.params.data,
    },
  });

  res.render("search_recipe", {
    title: "Recipe Lover!: View results",
    result,
    isMain: true,
    isSearch: true,
  });
});
