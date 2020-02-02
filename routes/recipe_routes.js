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
  EditRecipePageSettings,
  SearchRecipe,
  ViewRecipe,
  ViewAllRecipes,
} = require("../config/page_settings");

const { Op } = Sequelize;

const accessDenied = (res) => res.redirect("/404");

router.route("/add")
  .get(checkAuthenticated, (req, res) => {
    res.render("add_recipe", {
      username: req.user.name,
      isLogin: true,
    });
  })
  .post((req, res) => {
    const data = {
      title: req.body.title,
      ingredients: req.body.ingredients,
      method: req.body.method,
      creditTo: req.body.creditTo,
      source: req.body.source,
      photo: req.body.photo,
      authorId: req.user.id,
    };
    RECIPES.create(data).then(({ id }) => {
      try {
        return res.json({
          data: {
            recipeId: id,
          },
        });
      } catch (err) {
        return res.status(500).json({
          error: [{ msg: "Something went wrong in saving data. Try again later." }],
        });
      }
    });
  });

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
    return accessDenied(res);
  }
});

// route: /recipe/delete/:id
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  if (!req.user) {
    return accessDenied(res);
  }
  try {
    const recipe = await RECIPES.findOne({
      where: { id },
      attributes: ["authorId"],
    });
    // check if is author
    if (recipe && recipe.authorId !== req.user.id) {
      return accessDenied(res);
    }
    // delete favourites first
    await FAVOURITES.destroy({
      where: {
        recipeId: id,
      },
    });
    // delete recipe
    await RECIPES.destroy({
      where: { id },
    });
    // return success status
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: [{ msg: "Something went wrong in deletion. Try again later." }],
    });
  }
});

// route /recipe/edit
router.put("/edit", async (req, res) => {
  const {
    id,
    title,
    ingredients,
    method,
    creditTo,
    source,
    photo,
  } = req.body;

  // check login
  if (!req.user) {
    return accessDenied(res);
  }

  try {
    // check the record
    const recipe = await RECIPES.findOne({
      where: { id },
      attributes: ["authorId"],
    });
    // check if is author
    if (recipe.authorId !== req.user.id) {
      return accessDenied(res);
    }
    // delete recipe
    await RECIPES.update(
      {
        title,
        ingredients,
        method,
        creditTo,
        source,
        photo,
      },
      {
        where: { id },
      },
    );
    // return success status
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: [{ msg: "Something went wrong in deletion. Try again later." }],
    });
  }
});

// route "/recipe/edit/:id"
router.get("/edit/:id", checkAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    // get recipe
    const recipe = await RECIPES.findOne({
      where: { id },
    });
    // render page
    const pageSettings = {
      ...EditRecipePageSettings,
      id: recipe.id,
      recipeTitle: recipe.title,
      ingredients: recipe.ingredients,
      method: recipe.method,
      creditTo: recipe.creditTo,
      source: recipe.source,
      photo: recipe.photo,
      username: req.user.name,
    };
    return res.render("edit_recipe", pageSettings);
  } catch (err) {
    console.error(err);
    return accessDenied(res);
  }
});

// route /recipe/publish
router.put("/publish/:id", async (req, res) => {
  const { id } = req.params;

  // check login
  if (!req.user) {
    return accessDenied(res);
  }

  try {
    // check the record
    const recipe = await RECIPES.findOne({
      where: { id },
      attributes: ["authorId"],
    });
    // check if is author
    if (recipe.authorId !== req.user.id) {
      return accessDenied(res);
    }
    // delete recipe
    await RECIPES.update(
      {
        is_private: false,
      },
      {
        where: { id },
      },
    );
    // return success status
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: [{ msg: "Something went wrong in deletion. Try again later." }],
    });
  }
});

// route /recipe/search
router.get("/search", (_, res) => res.render("search_recipe", {
  title: "Recipe Lovers!: View Search",
  isMain: true,
  isSearch: true,
}));

// post request for recipe search
router.get("/search/:title", async (req, res) => {
  const userId = req.user ? req.user.id : null;
  const userName = req.user ? req.user.name : null;

  const result = await RECIPES.findAll({
    where: {
      title: {
        [Op.like]: "%".concat(req.params.title, "%"),
      },
    },
    include: [{
      model: FAVOURITES,
      attributes: ["userId"],
    }],
  });

  const recipes = result.map(({ dataValues }) => ({
    id: dataValues.id,
    title: dataValues.title,
    photo: dataValues.photo,
    favCount: dataValues.favourites.length,
    isLiked: dataValues.favourites.find((fav) => fav.userId === userId),
    username: userName,
  }));

  const pageSettings = {
    ...SearchRecipe,
    recipes,
  };
  if (req.user) {
    pageSettings.username = req.user.name;
  }
  return res.render("search_recipe", pageSettings);
});

// route "/recipe/{id}" : Recipe page
router.route("/:id")
  .get(async (req, res) => {
    const { id } = req.params;
    const userId = req.user ? req.user.id : null;
    const userName = req.user ? req.user.name : null;

    try {
      // get data
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
          },
        ],
      });
      // render recipe page.
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
          isPrivate,
          created: moment(createdAt).fromNow(),
          updated: moment(updatedAt).fromNow(),
          author,
          favCount: favourites.length,
          isLiked: favourites.find((fav) => fav.userId === userId),
          isAuthor: userId === authorId,
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
        return accessDenied(res);
      }

      // if recipe is not marked as private,
      // everyone can see it
      return renderRecipePage();
    } catch (error) {
      console.error(error);
      return accessDenied(res);
    }
  });

module.exports = router;
