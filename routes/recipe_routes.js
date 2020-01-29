// for /recipe routes

const router = require("express").Router();

// const Recipes = require("../models").recipe;

// --- GET Routes ---
// route "/recipe" : Recipe page
router.get("/", (_, res) => res.render("recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));

// route "/recipe/search" : Search page
router.get("/search", (_, res) => res.render("search", {
  title: "Recipe Lovers!: Search",
  isMain: true,
  isSearch: true,
}));

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
