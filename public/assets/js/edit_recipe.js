$(document).ready(() => {
  $("#btn-save").click(async (event) => {
    event.preventDefault();
    const errors = [];
    let id = $("#updateId").val().trim();
    if (!id) {
      id = window.location.href.split("/").pop();
    }
    const title = $("#updateTitle").val().trim();
    if (!title) {
      errors.push({ msg: "Title is required." });
    }
    const ingredients = $("#updateIngredients").val().trim();
    if (!ingredients) {
      errors.push({ msg: "Ingredients is required." });
    }
    const method = $("#updateMethod").val().trim();
    if (!method) {
      errors.push({ msg: "Method is required." });
    }
    const creditTo = $("#updateCredit").val().trim();
    const source = $("#updateSource").val().trim();
    const photo = $("#updateImage").val().trim();
    if (errors.length > 0) {
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }
    try {
      // connect
      const response = await $.ajax({
        url: "/recipe/edit",
        method: "PUT",
        data: {
          id,
          title,
          ingredients,
          method,
          creditTo,
          source,
          photo,
        },
      });
      // if there is an error message.
      if (response.error) {
        // eslint-disable-next-line no-undef
        return alertUser(response.error);
      }
      // when success
      return window.location.replace(`/recipe/${id}`);
    } catch (error) {
      // eslint-disable-next-line no-undef
      return alertUser(error.responseJSON.error);
    }
  });
});
