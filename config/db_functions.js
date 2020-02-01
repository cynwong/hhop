// get the models
const models = require("../models");

const Favourites = models.favourite;
const Recipe = models.recipe;

/**
 * Get all favoured recipes
 * @param {integer} userId
 * @return {array} array of Favourite objects
 */
const getAllFavRecipes = async (userId) => {
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
  return favs;
};


module.exports = {
  /**
   * Retrieve Recipes Information favoured by user
   * @param {integer} userId
   * @return {array}  array of recipe object
   * recipe object = {
   *  id,       //integer
   *  title,    // string
   *  photo,    // uri
   *  favCount  // integer
   * }
   */
  getAllFavBrief: async (userId) => {
    const favs = await getAllFavRecipes(userId);

    // return fav recipes brief data
    return favs.map(({ recipe }) => {
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
        favCount: favourites.length,
        isLiked: true,
      };
    });
  },
};
