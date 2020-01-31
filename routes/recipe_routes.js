// for /recipe routes

const router = require("express").Router();
const Sequelize = require('sequelize');
const Recipes = require("../models").recipe;

const { Op } = Sequelize;

// --- GET Routes ---
// route "/recipe" : Recipe page
router.get("/", (_, res) => res.render("view_recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));


router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: view Search",
  isMain: true,
  isSearch: true,
}));


// post request for recipe search
router.get("/search/:title", async (req, res) => {
  const result = await Recipes.findAll({
    where: {
      title: {
        [Op.like]: "%".concat(req.params.title, "%"),
      },
    },
  });
  // console.log(result);
  const recipes = result.map(({ dataValues }) => ({
    id: dataValues.id,
    authorId: dataValues.authorId,
    recipe: dataValues,
  }));
  // console.log(result[0].dataValues);
  res.render("search_recipe", {
    title: "View Search",
    result: recipes,
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
