// for /favourite routes
const router = require("express").Router();

const { checkAuthenticated } = require("../config/auth");
const {
  ViewMyFavouritesPageSettings,
} = require("../config/page_settings");


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

// --- GET Routes ---
router.get("/", checkAuthenticated, async (req, res) => {
  // get current user id
  const { user } = req;
  const userId = user.id;
  const userName = user.name;

  // get favourites
  const favs = await FAVOURITES.findAll({
    where: {
      userId,
    },
    include: {
      model: RECIPES,
      require: true,
      include: [{
        model: FAVOURITES,
        attributes: ["recipeId"],
      }],
    },
  });

  // get recipes
  const recipes = favs.map(({ recipe }) => {
    const {
      id,
      title,
      photo,
      favourites,
    } = recipe;
    return {
      id,
      title,
      photo,
      username: userName,
      favCount: favourites.length,
      isLiked: true,
    };
  });

  // construct view page.
  const pageSettings = {
    ...ViewMyFavouritesPageSettings,
    username: userName,
    recipes,
  };
  res.render("view_all_favourites", pageSettings);
});

// --- POST ---
router.post("/", async (req, res) => {
  const { recipeId } = req.body;
  const userId = req.user.id;

  if (!userId || !recipeId) {
    return res.status(400).json({
      error: [{ msg: "Something went wrong. Try again later. " }],
    });
  }
  try {
    await FAVOURITES.create({
      recipeId,
      userId,
    });
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: [{ msg: "Something went wrong. Try again later. " }],
    });
  }
});

// --- DELETE ---
router.delete("/:id", async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  try {
    await FAVOURITES.destroy({
      where: {
        recipeId,
        userId,
      },
    });
    return res.status(200).json({
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({
      error: [
        { msg: "Unable to remove favourite" },
      ],
    });
  }
});

module.exports = router;
