// for /recipe routes

const router = require("express").Router();

// const Recipes = require("../models").recipe;

// --- GET Routes ---
// route "/recipe" : Recipe page
router.get("/", (_, res) => res.render("view_recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));

// route "/recipe/search" : Search page
router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: Search",
  isMain: true,
  isSearch: true,
}));

// route "/recipe/add" : Search page
  router.post("/add", function(req, res) {
    console.log(req.body);
    user.recipe.create({
      title: req.body.title,
      ingredients: req.body.ingredients,
      method: req.body.method,
      is_private: req.body.is_private,
      creditTo: req.body.creditTo,
      source: req.body.source,
      photo: req.body.photo
    })
      .then(function(results) {
        res.json();
      });
  });

// });

// --- PUT ---
// router.put("<<ROUTE>>", (req, res) => {
// });

// --- DELETE ---
// router.delete("/:id", (req, res) => {
// });

module.exports = router;
