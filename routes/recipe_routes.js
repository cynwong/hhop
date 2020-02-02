// for /recipe routes

const router = require("express").Router();
const Sequelize = require("sequelize");
const { checkAuthenticated } = require("../config/auth");
const Recipes = require("../models").recipe;

const { Op } = Sequelize;

// --- GET Routes ---
router.get("/", (_, res) => res.render("view_recipe", {
  title: "Recipe Lovers!",
  isMain: true,
  isSearch: true,
}));


router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: View Search",
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
  const recipes = result.map(({ dataValues }) => ({
    id: dataValues.id,
    recipe: dataValues,
  }));

  const notice = "NO RESULT";
  if (result.length === 0) {
    res.render("search_recipe", {
      title: "No result",
      noresult: notice,
      isSearch: true,
    });
  } else {
    res.render("search_recipe", {
      title: "View Search",
      recipes,
      isSearch: true,
    });
  }
});


// --- POST ---
router.post("/add", (req, res) => {
  const data = {
    title: req.body.title,
    ingredients: req.body.ingredients,
    method: req.body.method,
    creditTo: req.body.creditTo,
    source: req.body.source,
    photo: req.body.photo,
    authorId: req.user.id,
  };
  Recipes.create(data).then((Res) => {
    res.json(Res);
    try {
      res.json(Res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
});

router.get("/add", checkAuthenticated, (req, res) => {
  res.render("add_recipe", {
    user: req.user,
    isLogin: true,
  });
});

// --- PUT ---

router.get("/edit", (req, res) => {
  res.render("edit_recipe", {
    isLogin: true,
  });
});

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
    res.end();
  });
});

// --- DELETE ---
router.delete("/:id", (req, res) => {
  Recipes.destroy({
    where: {
      id: req.params.id,
    },
  }).then((Recipe) => {
    res.json(Recipe);
  });
});

module.exports = router;
