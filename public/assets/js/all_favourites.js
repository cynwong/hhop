
$(document).ready(() => {
  // listener for favourite buttons.
  $(".btn-favourite").click(async (event) => {
    event.preventDefault();
    const $target = $(event.target);
    if ($target.hasClass("fas") || $target.find("i").hasClass("fas")) {
      const $container = $target.closest(".recipe.card");
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
    }
    return null;
  });
});
