$(document).ready(() => {
  // delete button listener
  $(".btn-delete").click(async (event) => {
    event.preventDefault();

    // get recipe id
    const id = $(event.target).closest(".recipe").data("id");
    try {
      // delete the recipe
      await $.ajax({
        method: "DELETE",
        url: `/recipe/delete/${id}`,
      });
      // if success, redirect to user homepage.
      return window.location.replace("/user");
    } catch (err) {
      // eslint-disable-next-line no-undef
      return alertUser({ error: err.responseJson.error });
    }
  });
});
