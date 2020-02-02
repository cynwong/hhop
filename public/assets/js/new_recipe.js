/* eslint-disable no-undef */
$(document).ready(() => {
  $("#submit").click(async (event) => {
    event.preventDefault();
    const title = $("#newTitle");
    const ingredients = $("#newIngredients");
    const method = $("#newMethod");
    const credit = $("#newCredit");
    const source = $("#newSource");
    const addImage = $("#newImage");
    const isPvt = $("isPvt");
    const errors = [];

    const data = {
      title: title.val().trim(),
      ingredients: ingredients.val().trim(),
      method: method.val().trim(),
      creditTo: credit.val().trim(),
      source: source.val().trim(),
      photo: addImage.val().trim(),
      isPvt: isPvt.val(),
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
