// for /recipe routes
const router = require("express").Router();
const Sequelize = require("sequelize");
const moment = require("moment");

const { checkAuthenticated } = require("../config/auth");

// get db models.
const models = require("../models");
/**
 * @typeof db.model
 */
const FAVOURITES = models.favourite;
/**
 * @typeof db.model
 */
const RECIPES = models.recipe;
/**
 * @typeof db.model
 */
const USERS = models.user;

// get page settings
const {
  ViewRecipe,
  ViewAllRecipes,
} = require("../config/page_settings");

const { Op } = Sequelize;

// --- GET Routes ---
// route "/recipe/all" : Recipe page
router.get("/all", checkAuthenticated, async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const userName = req.user ? req.user.name : null;

  try {
    const records = await RECIPES.findAll({
      where: { authorId: userId },
      include: [
        {
          model: FAVOURITES,
          attributes: ["recipeId"],
        },
      ],
    });
    const recipes = records.map(({ dataValues }) => {
      const {
        id,
        title,
        photo,
        favourites,
      } = dataValues;
      return {
        id,
        title,
        photo,
        favCount: favourites.length,
        username: userName,
        isLiked: favourites.find((fav) => fav.recipeId === id),
      };
    });
    return res.render("view_all_recipes", {
      ...ViewAllRecipes,
      recipes,
      username: userName,
    });
  } catch (error) {
    console.error(error);
    return res.redirect("/404");
  }
});

router.get("/add", checkAuthenticated, (req, res) => {
  res.render("add_recipe", {
    user: req.user,
    isLogin: true,
  });
});

// route "/recipe/{id}" : Recipe page
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const userId = req.user ? req.user.id : null;
  const userName = req.user ? req.user.name : null;

  try {
    const {
      id: recipeId,
      title,
      ingredients,
      method,
      is_private: isPrivate,
      creditTo,
      source,
      photo,
      createdAt,
      updatedAt,
      authorId,
      user: {
        name: author,
      },
      favourites,
    } = await RECIPES.findOne({
      where: { id },
      include: [
        {
          model: USERS,
          attributes: ["name"],
          required: true,
        },
        {
          model: FAVOURITES,
          attributes: ["recipeId"],
        },
      ],
    });

    const renderRecipePage = () => {
      const pageSettings = {
        ...ViewRecipe,
        recipeId,
        recipeTitle: title,
        ingredients,
        method,
        creditTo,
        source,
        photo,
        created: moment(createdAt).fromNow(),
        updated: moment(updatedAt).fromNow(),
        author,
        favCount: favourites.length,
      };
      if (userName) {
        pageSettings.username = userName;
      }
      return res.render("view_recipe", pageSettings);
    };

    if (isPrivate) {
      // if private,
      if (userId && userId === authorId) {
        return renderRecipePage();
      }
      // if not author
      return res.redirect("/404");
    }

    // if recipe is not marked as private,
    // everyone can see it
    return renderRecipePage();
  } catch (error) {
    console.error(error);
    return res.redirect("/404");
  }
});


router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: View Search",
  isMain: true,
  isSearch: true,
}));


// post request for recipe search
router.get("/search/:title", async (req, res) => {
  const result = await RECIPES.findAll({
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
  RECIPES.create(data).then((Res) => {
    res.json(Res);
    try {
      res.json(Res);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  });
});


// --- PUT ---

router.get("/edit", (req, res) => {
  res.render("edit_recipe", {
    isLogin: true,
  });
});

router.put("/edit", (req, res) => {
  RECIPES.update({
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
  RECIPES.destroy({
    where: {
      id: req.params.id,
    },
  }).then((Recipe) => {
    res.json(Recipe);
  });
});

module.exports = router;
