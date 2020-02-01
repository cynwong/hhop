// $(document).ready(() => {

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
  // function newRecipe() {
  $.ajax({
    method: "POST",
    url: "/recipe/add",
    data: {
      title: title.val(),
      ingredients: ingredients.val(),
      method: method.val(),
      credit: credit.val(),
      source: source.val(),
      addImage: addImage.val(),
    },
  }).then((res) => {
    if (res) {
      alertText.text("New Recipe added Successfully");
    }
  });
});

/*   function runCheck() {
    if (title !== "" && ingredients !== "" && method !== "") {
      alertText.text("Please check if all required information has been filled");
    } else {
      return
    }
  function submit(event) {
    event.preventDefault();
    runCheck();
  } */

// $(document).on("submit", "#newRecipe", submit);
