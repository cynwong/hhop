// for /recipe routes

const router = require("express").Router();
const Recipes = require("../models").recipe;

// --- GET Routes ---
// route "/recipe" : Recipe page
router.get("/", (_, res) => res.render("view_recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));

// route "/recipe/search" : Search page
router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: View Search",
  isMain: true,
  isSearch: true,
}));

// route "/recipe/add" : Search page
router.post("/add", (req, res) => {
console.log(req.body);
  Recipes.create({
    title: req.body.title,
    ingredients: req.body.ingredients,
    method: req.body.method,
    is_private: req.body.is_private,
    creditTo: req.body.creditTo,
    source: req.body.source,
    photo: req.body.photo,
  }).then((Recipe) => {
    res.json(Recipe)
      .catch((err) => res.status(500).json(err));
  });
});

router.get("/add", (req, res) => {
  res.render("add_recipe");
});

// });

// --- PUT ---
router.put("/edit", (req, res) => {
  Recipes.update({
    title: req.body.title,
    ingredients: req.body.ingredients,
    method: req.body.method,
    is_private: req.body.is_private,
    creditTo: req.body.creditTo,
    source: req.body.source,
    photo: req.body.photo,
  }, {
    where: {
      id: req.body.id,
    },
  }).then(() => {
    // link to username or user id
    // try req.user
    res.end();
  });
});
// });

// --- DELETE ---
router.delete("/:id", (req, res) => {
  // add find me
  // user.recipe.user.id = user.id
  Recipes.destroy({
    where: {
      id: req.params.id,
    },
  }).then((Recipe) => {
    // link to username or user id
    res.json(Recipe);
  });
});

module.exports = router;
