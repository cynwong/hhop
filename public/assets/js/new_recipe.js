const title = $("#newTitle");
const ingredients = $("#newIngredients");
const method = $("#newMethod");
const credit = $("#newCredit");
const source = $("#newSource");
const addImage = $("#newImage");
const alertText = $("#alert-text");
// const submit = $("#submit");

$("#submit").on("click", (event) => {
  event.preventDefault();
  const data = {
    title: title.val().trim(),
    ingredients: ingredients.val().trim(),
    method: method.val().trim(),
    creditTo: credit.val().trim(),
    source: source.val().trim(),
    photo: addImage.val().trim(),
  };
  $.ajax({
    method: "POST",
    url: "/recipe/add",
    data,
  }).then((res) => {
    if (res) {
      alertText.text("Your new recipe has been added!");
      setTimeout(window.location.replace("/recipe/add"), 6000);
    } if (res.error) {
      alertText.text("Please check if all required information has been filled");
    }
  });
});
