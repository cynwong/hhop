/**
 * remove a specific Favourite record
 * @param {jQuery Element} $container
 * @return null
 */
const removeFavourite = async ($container) => {
  // get recipe id
  const id = $container.data("id");

  try {
    // send data to server
    const response = await $.ajax({
      method: "DELETE",
      url: `/favourite/${id}`,
    });
    // if success
    if (response.isSuccess) {
      // remove the whole card.
      $container.remove();
    }
    return null;
  } catch (err) {
    // eslint-disable-next-line no-undef
    return alertUser(err.responseJSON.error);
  }
};

$(document).ready(() => {
  // listener for favourite buttons.
  $(".btn-favourite").click((event) => {
    event.preventDefault();
    const $target = $(event.target);
    if ($target.find("i").hasClass("fas")) {
      return removeFavourite($target.closest(".recipe.card"));
    }
    return null;
  });
});
