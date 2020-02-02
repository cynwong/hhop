/**
 * connect to server and response
 * @param {object} settings setting object for ajax function
 */
const submitData = async (settings) => {
  try {
    const response = await $.ajax(settings);
    // if success
    if (response.isSuccess) {
      // remove the whole card.
      return window.location.reload();
    }
    // eslint-disable-next-line no-undef
    return alertUser(response.error);
  } catch (error) {
    // eslint-disable-next-line no-undef
    return alertUser(err.responseJSON.error);
  }
};

$(document).ready(() => {
  // listener for favourite buttons.
  $(".btn-favourite").click(async event => {
    event.preventDefault();
    const $target = $(event.target);
    const $container = $target.closest(".recipe.card");
    const id = $container.data("id");
    if ($target.hasClass("fas") || $target.find("i").hasClass("fas")) {
      await submitData({
        method: "DELETE",
        url: `/favourite/${id}`
      });
      return null;
    }
    await submitData({
      method: "post",
      url: "/favourite",
      data: {
        recipeId: id,
      },
    });
    return null;
  });
});
