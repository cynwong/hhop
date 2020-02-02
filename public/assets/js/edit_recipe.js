$("#edit").click(async (event) => {



  event.preventDefault();
  const title = $("#updateTitle");
  const ingredients = $("#updateIngredients");
  const method = $("#updateMethod");
  const credit = $("#updateCredit");
  const source = $("#updateSource");
  const addImage = $("#updateImage");

  const data = {
    title: title.val().trim(),
    ingredients: ingredients.val().trim(),
    method: method.val().trim(),
    creditTo: credit.val().trim(),
    source: source.val().trim(),
    photo: addImage.val().trim(),
  };

  try {
    const response = await $.ajax({
      method: "PUT",
      url: "/recipe/edit",
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
