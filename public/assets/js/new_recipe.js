$(document).ready(() => {
  $("#submit").click(async (event) => {
    event.preventDefault();
    const title = $("#newTitle").val().trim();
    const ingredients = $("#newIngredients").val().trim();
    const method = $("#newMethod").val().trim();
    const creditTo = $("#newCredit").val().trim();
    const source = $("#newSource").val().trim();
    const photo = $("#newImage").val().trim();
    const errors = [];

    // validation
    if (!title) errors.push({ msg: "Please enter a title." });

    if (!ingredients) errors.push({ msg: "Please enter a ingredients." });

    if (!method) errors.push({ msg: "Please enter method." });

    if (errors.length > 0) {
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }

    try {
      // save the data
      const response = await $.ajax({
        method: "POST",
        url: "/recipe/add",
        data: {
          title,
          ingredients,
          method,
          creditTo,
          source,
          photo,
        },
      });
      if (response.error) {
        // eslint-disable-next-line no-undef
        return alertUser(response.error);
      }
      return window.location.replace(`/recipe/${response.data.recipeId}`);
    } catch (error) {
      // eslint-disable-next-line no-undef
      return alertUser(error.responseJSON.error);
    }
  });
});
