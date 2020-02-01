// for /favourite routes
const router = require("express").Router();

const { checkAuthenticated } = require("../config/auth");
const { ViewMyFavourites } = require("../config/page_settings");


const Favourites = require("../models").favourite;

// --- GET Routes ---
router.get("/", checkAuthenticated, async (req, res) => {
  // get current user id
  const { user } = req;
  const userId = user.id;

  // get favourites
  const favs = await Favourites.findAll({
    where: {
      userId,
    },
    include: {
      model: Recipe,
      require: true,
      include: [{
        model: Favourites,
        attributes: ["recipeId"],
      }],
    },
  });

  // get recipes
  const recipes = favs.map(({ recipe : }) => {
    const {
      id,
      title,
      photo,
      favourites
    } = recipe;
    return {
      id,
      title,
      photo,
      favCount: favourites.length,
      isLiked: true,
    };
  });

  // construct view page.
  const pageSettings = {
    ...ViewMyFavourites,
    user,
    recipes,
  };
  res.render("view_favourites", pageSettings);
});

// --- POST ---
// router.post("/", (req, res) => {
// });

// --- DELETE ---
router.delete("/:id", async (req, res) => {
  const recipeId = req.params.id;
  const userId = req.user.id;

  try {
    await Favourites.destroy({
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
