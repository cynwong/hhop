$(document).ready(() => {
  $("#save").click(async (event) => {
    event.preventDefault();
    const title = $("#updateTitle");
    const ingredients = $("#updateIngredients");
    const method = $("#updateMethod");
    const credit = $("#updateCredit");
    const source = $("#updateSource");
    const addImage = $("#updateImage");
    const errors = [];
    const data = {
      title: title.val().trim(),
      ingredients: ingredients.val().trim(),
      method: method.val().trim(),
      creditTo: credit.val().trim(),
      source: source.val().trim(),
      photo: addImage.val().trim(),
    };

    const titleErr = title.val().trim();
    if (!titleErr) errors.push({ msg: "Please enter a title." });

    const ingredientsErr = ingredients.val().trim();
    if (!ingredientsErr) errors.push({ msg: "Please enter a ingredients." });

    const methodErr = method.val().trim();
    if (!methodErr) errors.push({ msg: "Please enter method." });

    if (errors.length > 0) {
      // eslint-disable-next-line no-undef
      return alertUser(errors);
    }

    try {
      const response = await $.ajax({
        method: "POST",
        url: "/recipe/add",
        data,
      });
      if (response.error) {
        return alertUser(response.error);
      }
      return window.location.replace("/recipe/");
    } catch (error) {
      // eslint-disable-next-line no-undef
      return alertUser(error.responseJSON.error);
    }
  });
});


function getRecipe() {
  $.get("recipe/", (data) => {
    recipe = data + id;
  });
}

function deleteRecipe(event) {
  event.stopPropagation();
  const id = $(this).data("id");
  $.ajax({
    method: "DELETE",
    url: `/recipe/:delete${id}`,
  }).then(getRecipe);
}
